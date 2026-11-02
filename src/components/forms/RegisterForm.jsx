import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { brand, register } from "@/data/brochure";
import { cn } from "@/lib/utils";

const FIELDS = [
  { id: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "mobile", label: "Mobile Number", type: "tel", autoComplete: "tel", inputMode: "tel" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "city", label: "City", type: "text", autoComplete: "address-level2" },
];

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^\+?[\d\s-]{10,15}$/.test(v.mobile.trim())) e.mobile = "Please enter a valid mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.city.trim().length < 2) e.city = "Please enter your city.";
  if (!v.consent) e.consent = "Please provide consent to be contacted.";
  return e;
};

export const RegisterForm = () => {
  const [values, setValues] = useState({ name: "", mobile: "", email: "", city: "", consent: false });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: k === "consent" ? e.target.checked : e.target.value }));

  // Frontend only: no submission is stored or sent.
  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  };

  return (
    <div className="relative min-h-[520px]">
      <AnimatePresence initial={false}>
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="flex flex-col items-start gap-6 pt-6" data-testid="register-success" role="status">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink"><Check className="h-6 w-6" strokeWidth={1.5} /></span>
            <p className="font-display text-5xl leading-tight text-ink">Thank you, {values.name.split(" ")[0]}.</p>
            <p className="max-w-md font-sans text-base leading-relaxed text-ink/80">Your interest has been noted. The Arkade team will be in touch.</p>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={onSubmit} noValidate data-testid="register-form" className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.id} className="flex flex-col">
                <label htmlFor={`f-${f.id}`} className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/75">{f.label}</label>
                <input
                  id={`f-${f.id}`}
                  name={f.id}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  value={values[f.id]}
                  onChange={set(f.id)}
                  aria-invalid={!!errors[f.id]}
                  aria-describedby={errors[f.id] ? `e-${f.id}` : undefined}
                  className={cn("field", errors[f.id] && "border-b-[#9B3B2A]")}
                  data-testid={`register-input-${f.id}`}
                />
                {errors[f.id] && <p id={`e-${f.id}`} className="mt-2 font-sans text-xs text-[#9B3B2A]" data-testid={`register-error-${f.id}`}>{errors[f.id]}</p>}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-4">
                <input type="checkbox" checked={values.consent} onChange={set("consent")} className="mt-1 h-4 w-4 shrink-0 accent-[#8A6A3B]" data-testid="register-consent" aria-describedby={errors.consent ? "e-consent" : undefined} />
                <span className="font-sans text-[13px] leading-relaxed text-ink/80">
                  {register.consent} Please read our privacy policy: {brand.privacy}.
                </span>
              </label>
              {errors.consent && <p id="e-consent" className="mt-2 font-sans text-xs text-[#9B3B2A]" data-testid="register-error-consent">{errors.consent}</p>}
            </div>
            <div className="sm:col-span-2">
              <button type="submit" data-testid="register-submit" className="group relative inline-flex items-center gap-4 overflow-hidden bg-ink px-10 py-5 font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-ink">
                <span className="absolute inset-0 origin-left scale-x-0 bg-gold-deep transition-transform duration-700 ease-out group-hover:scale-x-100" aria-hidden />
                <span className="relative">Submit</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
