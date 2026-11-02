import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/brochure";

/* ------------------------------------------------------------------
   Validation rules. Each returns an error message, or "" when valid.
------------------------------------------------------------------- */

const NAME_RE = /^[\p{L}][\p{L}\p{M}\s.'-]{1,59}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6-9.
const PHONE_RE = /^(\+91|91|0)?[6-9]\d{9}$/;
const MESSAGE_MAX = 500;

const rules = {
  name: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your full name.";
    if (!NAME_RE.test(s)) return "Use letters only, at least 2 characters.";
    return "";
  },
  email: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your email address.";
    if (s.length > 254 || !EMAIL_RE.test(s)) return "Enter a valid email, like you@example.com.";
    return "";
  },
  phone: (v) => {
    const s = v.replace(/[\s-]/g, "");
    if (!s) return "Please enter your phone number.";
    if (!PHONE_RE.test(s)) return "Enter a valid 10-digit mobile number.";
    return "";
  },
  message: (v) => (v.length > MESSAGE_MAX ? `Please keep your message under ${MESSAGE_MAX} characters.` : ""),
};

const FIELD_ORDER = ["name", "email", "phone", "message"];
const EMPTY = { name: "", email: "", phone: "", message: "" };

const validateAll = (values) =>
  FIELD_ORDER.reduce((errs, key) => {
    const msg = rules[key](values[key]);
    return msg ? { ...errs, [key]: msg } : errs;
  }, {});

export const Contact = () => {
  const sectionRef = useRef(null);
  const thanksRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(null); // snapshot of what was submitted

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Move focus to the thank-you heading so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (sent) thanksRef.current?.focus({ preventScroll: true });
  }, [sent]);

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "phone") value = value.replace(/[^\d+\s-]/g, "");
    setValues((v) => ({ ...v, [name]: value }));
    // Once a field has been visited, re-check it as the person types.
    if (touched[name]) setErrors((errs) => ({ ...errs, [name]: rules[name](value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((errs) => ({ ...errs, [name]: rules[name](value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });

    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    // Frontend only: connect your API / CRM call here with `values`.
    setSent({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    });
  };

  const resetForm = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setSent(null);
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const error = (name) =>
    errors[name] ? (
      <span id={`contact-${name}-error`} className="ak-contact-error" role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="ak-contact"
      aria-labelledby="contact-title"
    >
      <div className="ak-contact-wrap">

        {/* LEFT IMAGE */}
        <div className="ak-contact-image">
          <img
            src={hero.image}
            alt="Arkade Thane"
            loading="lazy"
          />

          <div className="ak-contact-image-overlay" />

          <div className="ak-contact-image-copy">
            <span>ARKADE</span>
            <p>
              The shape of Thane
              <br />
              to come.
            </p>
          </div>
        </div>

        {/* RIGHT: FORM or THANK YOU */}
        <div className="ak-contact-content">
          {!sent ? (
            <>
              <div className="ak-contact-heading">
                <p className="ak-contact-eyebrow">
                  05 / Enquire now
                </p>

                <h2 id="contact-title">
                  Begin your
                  <em> next chapter.</em>
                </h2>

                <p className="ak-contact-intro">
                  Leave your details and our team will get
                  in touch with you shortly.
                </p>
              </div>

              <form
                className="ak-contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="ak-contact-field">
                  <label htmlFor="contact-name">
                    Full name
                  </label>
                  <input
                    {...fieldProps("name")}
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={60}
                    required
                  />
                  {error("name")}
                </div>

                <div className="ak-contact-row">
                  <div className="ak-contact-field">
                    <label htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      {...fieldProps("email")}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                    {error("email")}
                  </div>

                  <div className="ak-contact-field">
                    <label htmlFor="contact-phone">
                      Phone
                    </label>
                    <input
                      {...fieldProps("phone")}
                      type="tel"
                      inputMode="tel"
                      placeholder="+91"
                      autoComplete="tel"
                      maxLength={16}
                      required
                    />
                    {error("phone")}
                  </div>
                </div>

                <div className="ak-contact-field">
                  <label htmlFor="contact-message">
                    Message (optional)
                  </label>
                  <textarea
                    {...fieldProps("message")}
                    rows="3"
                    placeholder="Tell us what you're looking for"
                  />
                  {error("message")}
                </div>

                <button
                  type="submit"
                  className="ak-contact-submit"
                >
                  <span>Enquire now</span>
                  <ArrowUpRight size={18} strokeWidth={1.4} />
                </button>

                <p className="ak-contact-privacy">
                  By submitting this form, you agree to be
                  contacted by Arkade regarding your enquiry.
                </p>
              </form>
            </>
          ) : (
            <div className="ak-contact-thanks" role="status">
              <svg className="ak-contact-check" viewBox="0 0 56 56" aria-hidden="true">
                <circle cx="28" cy="28" r="26" />
                <path d="M17 29.5 L25 37 L39.5 20.5" />
              </svg>

              <p className="ak-contact-eyebrow ak-contact-eyebrow--static">
                Enquiry received
              </p>

              <h2 id="contact-title" ref={thanksRef} tabIndex={-1}>
                Thank you,
                <em> {sent.name.split(/\s+/)[0]}.</em>
              </h2>

              <p className="ak-contact-intro ak-contact-intro--static">
                Our team will get in touch with you shortly.
              </p>

              <dl className="ak-contact-summary">
                <div>
                  <dt>Email</dt>
                  <dd>{sent.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{sent.phone}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="ak-contact-again"
                onClick={resetForm}
              >
                Send another enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};