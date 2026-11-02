import { brand, register } from "@/data/brochure";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wordmark } from "@/components/ui/ArkadeMark";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const Register = () => (
  <section id="register" data-chapter="arkade" className="bg-ivory py-14 lg:py-20" aria-labelledby="register-title">
    <div className="mx-auto grid max-w-[1680px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12 xl:pl-20">
      <div className="lg:col-span-5">
        <Eyebrow>{register.eyebrow}</Eyebrow>
        <MaskedLines id="register-title" lines={register.title} className="mt-8 font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] text-ink" />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-ink/80 lg:text-[17px]">{register.text}</p>
          <p className="mt-10 font-sans text-xs font-semibold tracking-[0.18em] text-ink/70" data-testid="rera-placeholder">{brand.rera}</p>
        </Reveal>
      </div>
      <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-6">
        <RegisterForm />
      </Reveal>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-ink/[.14] bg-ivory px-5 py-9 text-ink/70 sm:px-8 lg:px-12" data-testid="site-footer">
    <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Wordmark accent="#C9A462" className="text-ink" />
        <p className="mt-6 max-w-xs font-sans text-[13px] leading-relaxed text-ink/70">
          <span className="font-semibold text-ink">Corporate Address:</span> {brand.address}
        </p>
      </div>
      <div className="space-y-3 lg:col-span-7 lg:col-start-6">
        <p className="font-sans text-xs font-semibold tracking-[0.16em] text-ink">{brand.rera}</p>
        <p className="font-sans text-xs leading-relaxed text-ink/70"><span className="font-semibold text-ink">Disclaimer:</span> {brand.disclaimer}</p>
        <p className="font-sans text-xs text-ink/70">All images are representative images or artistic impressions. © {new Date().getFullYear()} Arkade.</p>
      </div>
    </div>
  </footer>
);