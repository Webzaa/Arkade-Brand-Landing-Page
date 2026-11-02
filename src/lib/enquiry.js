/**
 * Enquiry forms: ALL logic in one place.
 *
 * Used by both forms (the "Enquire" section and the popup) through <EnquiryForm />.
 * To go live you only touch THIS file:
 *   1. Set the endpoint:   REACT_APP_ENQUIRY_API_URL=https://your-api.example.com/enquiries   (in .env)
 *   2. If your API/CRM expects different field names, edit `toApiBody()` below.
 *   3. If it needs an auth header / API key, add it to `ENQUIRY_API.headers`.
 *      (Anything in a React env var is visible in the browser, so use a public form key, never a secret.
 *       For a secret key, call your own backend and let that talk to the CRM.)
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { captureMarketingParams } from "./marketing";

/* ------------------------------------------------------------------ */
/* 1. API configuration                                               */
/* ------------------------------------------------------------------ */
export const ENQUIRY_API = {
  url: process.env.REACT_APP_ENQUIRY_API_URL || "",
  method: "POST",
  // "json" sends a JSON body (PHP reads it with file_get_contents("php://input")).
  // "form" sends application/x-www-form-urlencoded (PHP reads it from $_POST). Set REACT_APP_ENQUIRY_ENCODING=form if the backend uses $_POST.
  encoding: process.env.REACT_APP_ENQUIRY_ENCODING === "form" ? "form" : "json",
  headers: {
    // "X-Api-Key": process.env.REACT_APP_ENQUIRY_API_KEY,
  },
  timeoutMs: 15000,
  // Only for UI work with no backend: REACT_APP_ENQUIRY_DRY_RUN=true shows the thank-you page without sending anything.
  dryRun: process.env.REACT_APP_ENQUIRY_DRY_RUN === "true",
};

/**
 * Maps our internal payload to the body your API expects. Rename / drop fields here.
 * Body built by buildPayload() below: lead details, configuration, form name and the marketing/UTM fields.
 */
const toApiBody = (payload) => payload;

/* ------------------------------------------------------------------ */
/* 2. Country codes                                                   */
/* ------------------------------------------------------------------ */
// `iso` is only a label (flag emojis don't render on Windows). Default is India.
export const COUNTRIES = [
  { iso: "IN", name: "India", dial: "91" },
  { iso: "AE", name: "United Arab Emirates", dial: "971" },
  { iso: "US", name: "United States", dial: "1" },
  { iso: "CA", name: "Canada", dial: "1" },
  { iso: "GB", name: "United Kingdom", dial: "44" },
  { iso: "SG", name: "Singapore", dial: "65" },
  { iso: "AU", name: "Australia", dial: "61" },
  { iso: "NZ", name: "New Zealand", dial: "64" },
  { iso: "SA", name: "Saudi Arabia", dial: "966" },
  { iso: "QA", name: "Qatar", dial: "974" },
  { iso: "KW", name: "Kuwait", dial: "965" },
  { iso: "OM", name: "Oman", dial: "968" },
  { iso: "BH", name: "Bahrain", dial: "973" },
  { iso: "DE", name: "Germany", dial: "49" },
  { iso: "FR", name: "France", dial: "33" },
  { iso: "NL", name: "Netherlands", dial: "31" },
  { iso: "CH", name: "Switzerland", dial: "41" },
  { iso: "HK", name: "Hong Kong", dial: "852" },
  { iso: "MY", name: "Malaysia", dial: "60" },
  { iso: "ZA", name: "South Africa", dial: "27" },
  { iso: "KE", name: "Kenya", dial: "254" },
  { iso: "NP", name: "Nepal", dial: "977" },
  { iso: "LK", name: "Sri Lanka", dial: "94" },
];
export const DEFAULT_COUNTRY = "IN";
const countryOf = (iso) => COUNTRIES.find((c) => c.iso === iso) || COUNTRIES[0];

/* ------------------------------------------------------------------ */
/* 3. Validation                                                      */
/* ------------------------------------------------------------------ */
const NAME_RE = /^[\p{L}][\p{L}\p{M}\s.'-]{1,59}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Digits of the national number only, as they follow the country code.
 * Tolerates a pasted "+91…" / "91…" for India and strips the local trunk "0" (e.g. UAE "050…" -> "50…").
 */
export const nationalNumber = (iso, raw) => {
  let d = String(raw || "").replace(/\D/g, "");
  if (countryOf(iso).dial === "91" && d.length === 12 && d.startsWith("91")) d = d.slice(2);
  return d.replace(/^0+/, "");
};

export const rules = {
  name: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your full name.";
    return NAME_RE.test(s) ? "" : "Use letters only, at least 2 characters.";
  },
  email: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your email address.";
    return s.length <= 254 && EMAIL_RE.test(s) ? "" : "Enter a valid email, like you@example.com.";
  },
  phone: (v, all) => {
    const c = countryOf(all.country);
    const d = nationalNumber(all.country, v);
    if (!d) return "Please enter your phone number.";
    if (c.dial === "91") return /^[6-9]\d{9}$/.test(d) ? "" : "Enter a valid 10-digit Indian mobile number.";
    return /^\d{6,14}$/.test(d) && c.dial.length + d.length <= 15 ? "" : "Enter a valid phone number for the selected country.";
  },
  consent: (v) => (v ? "" : "Please tick to let us contact you."),
};

const FIELDS = ["name", "email", "phone", "consent"]; // validation + focus order
export const CONFIGURATIONS = ["2 BHK", "3 BHK"];
const EMPTY = { name: "", email: "", country: DEFAULT_COUNTRY, phone: "", configuration: CONFIGURATIONS[0], consent: true };

export const validateAll = (values) => {
  const found = {};
  FIELDS.forEach((k) => { const m = rules[k](values[k], values); if (m) found[k] = m; });
  return found;
};

/* ------------------------------------------------------------------ */
/* 4. Payload + API call                                              */
/* ------------------------------------------------------------------ */
/**
 * Form names sent to the API as `formname`, per form. Both default to the value your CRM already knows;
 * change one here if you want popup leads and Enquire-section leads told apart in the database.
 */
const FORM_NAMES = {
  popup: "Arkade Contact Form",
  "enquire-section": "Arkade Contact Form",
};
const PROJECT_NAME = "Arkade";

/**
 * Builds the request body for the lead API from the form values + the stored campaign data in "./marketing".
 * captureMarketingParams() re-reads the cookies (and any utm_* / gclid in the current URL) at the moment of submit,
 * so a visitor who landed with ad parameters and clicked around before enquiring is still attributed.
 */
export const buildPayload = (values, source) => {
  const c = countryOf(values.country);
  const marketing = captureMarketingParams() || {};
  return {
    // Lead details
    name: values.name.trim().replace(/\s+/g, " "),
    email: values.email.trim().toLowerCase(),
    mobile: nationalNumber(values.country, values.phone), // national number only, no country code, no leading 0
    countrycode: `+${c.dial}`,
    countryname: c.name,

    // Project
    projectSelectValues: PROJECT_NAME,
    configuration: CONFIGURATIONS.includes(values.configuration) ? values.configuration : CONFIGURATIONS[0], // "2 BHK" | "3 BHK"

    // API required fields (not collected on this site: sent empty)
   configInterestValues: [
    CONFIGURATIONS.includes(values.configuration)
      ? values.configuration
      : CONFIGURATIONS[0],
  ],
    configTypeValues: [""],
    purposeValues: [""],
    visitdayValues: [""],
    favdestinationValues: [""],

    // Form details
    formname: FORM_NAMES[source] || FORM_NAMES.popup,
    form_id: "",
    leadgen_id: "",
    page_id: "",
    ad_id: "",

    // Marketing parameters
    utm_source: marketing.utm_source || "",
    utm_sub_source: marketing.utm_sub_source || "",
    utm_medium: marketing.utm_medium || "",
    campaigncode: marketing.campaigncode || "",
    campaignname: marketing.campaignname || marketing.utm_campaignname || "",
    utm_campaignname: marketing.utm_campaignname || marketing.campaignname || "",
    utm_campaignid: marketing.utm_campaignid || marketing.gad_campaignid || "",
    utm_adset: marketing.utm_adset || marketing.utm_adgroupname || "",
    utm_adgroupname: marketing.utm_adgroupname || marketing.utm_adset || "",
    utm_adgroupid: marketing.utm_adgroupid || "",
    utm_adname: marketing.utm_adname || marketing.utm_adcreative || "",
    utm_adcreative: marketing.utm_adcreative || marketing.utm_adname || "",
    Lead_Keyword: marketing.Lead_Keyword || marketing.keyword || "",
    keyword: marketing.keyword || marketing.Lead_Keyword || "",
    Lead_Placement: marketing.Lead_Placement || marketing.placement || "",
    placement: marketing.placement || marketing.Lead_Placement || "",
    Lead_Device: marketing.Lead_Device || marketing.device || "",
    device: marketing.device || marketing.Lead_Device || "",
    gad_source: marketing.gad_source || "",
    gad_campaignid: marketing.gad_campaignid || marketing.utm_campaignid || "",
    gbraid: marketing.gbraid || "",
    gclid: marketing.gclid || "",

    // Website
    websitename: typeof window !== "undefined" ? window.location.hostname : "",
  };
};

const toFormBody = (obj) => {
  const f = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((x) => f.append(`${k}[]`, x));
    else f.append(k, v ?? "");
  });
  return f;
};

/** Some PHP APIs answer HTTP 200 with {"success":false,...} when validation or the database insert fails. Returns that message, or "". */
const apiFailure = (data) => {
  if (!data || typeof data !== "object") return "";
  const bad =
    data.success === false || data.ok === false || data.status === false ||
    (typeof data.status === "string" && /^(error|fail)/i.test(data.status)) ||
    (data.error && data.success !== true);
  if (!bad) return "";
  return String(data.message || data.error || data.msg || "The server rejected the enquiry.");
};

/**
 * Sends one enquiry. Resolves on success, throws Error(message) on failure.
 * A missing endpoint is an error (never a silent success), so a wrong .env can't look like a working form.
 */
export const submitEnquiry = async (payload) => {
  if (!ENQUIRY_API.url) {
    if (ENQUIRY_API.dryRun) {
      // eslint-disable-next-line no-console
      console.warn("[enquiry] DRY RUN: nothing was sent. Payload:", payload);
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true, simulated: true };
    }
    throw new Error("REACT_APP_ENQUIRY_API_URL is not set (restart the dev server after editing .env), so nothing was sent.");
  }

  const body = toApiBody(payload);
  const isForm = ENQUIRY_API.encoding === "form";
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ENQUIRY_API.timeoutMs);
  try {
    const res = await fetch(ENQUIRY_API.url, {
      method: ENQUIRY_API.method,
      headers: isForm ? ENQUIRY_API.headers : { "Content-Type": "application/json", ...ENQUIRY_API.headers },
      body: isForm ? toFormBody(body) : JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await res.text();
    // eslint-disable-next-line no-console
    console.info(`[enquiry] API replied ${res.status}:`, text.slice(0, 500));
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    let data = null;
    try { data = JSON.parse(text); } catch { /* non-JSON body: judged by the HTTP status only */ }
    const failure = apiFailure(data);
    if (failure) throw new Error(failure);
    return { ok: true, data };
  } catch (err) {
    throw new Error(err.name === "AbortError" ? "The request timed out." : err.message || "Network error.");
  } finally {
    clearTimeout(timer);
  }
};

/* ------------------------------------------------------------------ */
/* 5. Hook used by <EnquiryForm />                                    */
/* ------------------------------------------------------------------ */
export const SUBMIT_ERROR = "Sorry, we couldn’t send your enquiry. Please try again in a moment.";

export function useEnquiryForm({ source, idPrefix }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [sentName, setSentName] = useState("");
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);

  const onChange = (ev) => {
    const { name, type, checked } = ev.target;
    let value = type === "checkbox" ? checked : ev.target.value;
    if (name === "phone") value = value.replace(/[^\d+\s-]/g, "");
    const next = { ...values, [name]: value };
    setValues(next);
    // re-check a field as the user types once it has been touched; re-check the phone when the country changes
    const out = {};
    if (touched[name] || type === "checkbox") out[name] = rules[name]?.(value, next) ?? "";
    if (name === "country" && touched.phone) out.phone = rules.phone(next.phone, next);
    if (Object.keys(out).length) setErrors((er) => ({ ...er, ...out }));
    if (status === "error") setStatus("idle");
  };

  const onBlur = (ev) => {
    const { name } = ev.target;
    if (!rules[name] || name === "consent") return;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: rules[name](values[name], values) }));
  };

  const submit = useCallback(async (ev) => {
    ev.preventDefault();
    if (status === "sending") return;
    const found = validateAll(values);
    setErrors(found);
    setTouched({ name: 1, email: 1, phone: 1 });
    const first = FIELDS.find((k) => found[k]);
    if (first) { document.getElementById(`${idPrefix}-${first}`)?.focus(); return; }

    setStatus("sending");
    try {
      await submitEnquiry(buildPayload(values, source));
      if (!alive.current) return;
      setSentName(values.name.trim());
      setStatus("sent");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[enquiry] submit failed:", err);
      if (alive.current) setStatus("error");
    }
  }, [values, status, source, idPrefix]);

  const reset = useCallback(() => {
    setValues(EMPTY); setErrors({}); setTouched({}); setStatus("idle"); setSentName("");
  }, []);

  return { values, errors, status, sentName, onChange, onBlur, submit, reset };
}