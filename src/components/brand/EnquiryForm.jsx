import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIGURATIONS, SUBMIT_ERROR, useEnquiryForm } from "@/lib/enquiry";
import { Arrow } from "./ui";
import { CountrySelect } from "./CountrySelect";

/**
 * The one enquiry form UI, used by the Enquire section and the popup. All logic lives in "@/lib/enquiry".
 *   idPrefix  unique per instance so element ids don't clash ("enq" | "pop")
 *   source    tag sent with the lead so you can tell which form it came from
 *   consent   consent copy
 *   tone      "light" (popup) | "dark" (Enquire section): colours of the country-code picker
 *   onSent    called once the enquiry has been sent, just before we go to /thank-you (the popup uses it to close)
 */
export const EnquiryForm = ({ idPrefix, source, consent, tone = "light", onSent }) => {
  const f = useEnquiryForm({ source, idPrefix });
  const { values, errors, status } = f;
  const navigate = useNavigate();
  const sending = status === "sending" || status === "sent";

  // success -> close the popup (if any) and show the thank-you page
  useEffect(() => {
    if (status !== "sent") return;
    onSent?.();
    navigate("/thank-you", { state: { name: f.sentName } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const id = (n) => `${idPrefix}-${n}`;
  const fp = (name) => ({
    id: id(name), name, value: values[name], onChange: f.onChange, onBlur: f.onBlur,
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${id(name)}-e` : undefined,
    className: "bl-field",
    disabled: sending,
  });
  const err = (name) => errors[name] ? <span className="bl-err" id={`${id(name)}-e`} role="alert">{errors[name]}</span> : null;

  return (
    <form className="bl-form" onSubmit={f.submit} noValidate>
      <div className="bl-f">
        <label htmlFor={id("name")}>Full name</label>
        <input {...fp("name")} type="text" autoComplete="name" placeholder="Your name" />
        {err("name")}
      </div>
      <div className="bl-f2">
        <div className="bl-f">
          <label htmlFor={id("email")}>Email</label>
          <input {...fp("email")} type="email" autoComplete="email" placeholder="you@example.com" />
          {err("email")}
        </div>
        <div className="bl-f">
          <label htmlFor={id("phone")}>Phone</label>
          <div className="bl-phone">
            <CountrySelect
              id={id("country")} value={values.country} disabled={sending} tone={tone}
              onChange={(iso) => f.onChange({ target: { name: "country", value: iso, type: "select-one" } })}
            />
            <input {...fp("phone")} type="tel" autoComplete="tel-national" inputMode="tel" placeholder={values.country === "IN" ? "98XXX XXXXX" : "Phone number"} />
          </div>
          {err("phone")}
        </div>
      </div>
      <div className="bl-f">
        <span className="bl-cfg-label" id={id("configuration-l")}>Preferred configuration</span>
        <div className="bl-cfg" role="radiogroup" aria-labelledby={id("configuration-l")}>
          {CONFIGURATIONS.map((opt) => (
            <button
              key={opt} type="button" role="radio" className="bl-cfg-opt"
              aria-checked={values.configuration === opt} disabled={sending}
              onClick={() => f.onChange({ target: { name: "configuration", value: opt, type: "button" } })}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <label className="bl-consent">
        <input id={id("consent")} name="consent" type="checkbox" checked={values.consent} onChange={f.onChange} disabled={sending} aria-invalid={errors.consent ? "true" : "false"} />
        <span>{consent}{err("consent")}</span>
      </label>
      {status === "error" && <span className="bl-err bl-err--form" role="alert">{SUBMIT_ERROR}</span>}
      <button type="submit" className="bl-btn" disabled={sending} aria-busy={sending}>
        {sending ? "Sending…" : <>Submit enquiry <Arrow /></>}
      </button>
    </form>
  );
};