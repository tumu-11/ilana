import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowUpRight, Mail, MessageCircle, Phone, Check } from "lucide-react";
import { CONTACT, SERVICES, whatsappLink } from "@/lib/site";
import { SplitHeadline, Reveal, EASE } from "@/components/site/motion";
import { BotanicalBranch } from "@/components/site/Botanical";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { interest?: string } =>
    typeof s["interest"] === "string" ? { interest: s["interest"] } : {},
  head: () => ({
    meta: [
      { title: "Book a Consultation - Contact ILANA Nutrition & Wellness" },
      { name: "description", content: "Call, WhatsApp, email or send an enquiry to book a personalised nutrition consultation with ILANA." },
      { property: "og:title", content: "Book a Consultation with ILANA" },
      { property: "og:description", content: "Start your journey to better nourishment - get in touch today." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  contact: z
    .string()
    .trim()
    .min(5, "Add a phone number or email so we can reply")
    .max(150)
    .refine((v) => /@/.test(v) ? z.string().email().safeParse(v).success : /^[+\d\s()-]{7,}$/.test(v), "Enter a valid phone number or email"),
  interest: z.string().min(1, "Choose an area of interest"),
  message: z.string().trim().max(1000).optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Field({ label, error, children, id }: { label: string; error?: string | undefined; children: React.ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-coffee">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} role="alert" className="mt-2 text-sm text-destructive" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "mt-3 w-full border-0 border-b border-forest/30 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink/35 transition-colors focus:border-gold focus:outline-none focus:ring-0 aria-[invalid=true]:border-destructive";

function Contact() {
  const { interest } = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const area = SERVICES.find((s) => s.slug === r.data.interest)?.title ?? r.data.interest;
    const message = whatsappLink(
      `Hello ILANA, my name is ${r.data.name}. I'm interested in ${area}. ${r.data.message ?? ""} You can reach me at ${r.data.contact}.`,
    );
    setSent(message);
    window.open(message, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="container-x relative pt-36 pb-28 md:pt-44">
      <BotanicalBranch className="pointer-events-none absolute right-0 top-24 hidden h-[460px] opacity-30 lg:block" />
      <p className="eyebrow text-coffee">Contact</p>
      <SplitHeadline as="h1" immediate text={"Let's grow\nsomething *good*."} className="display mt-6 text-forest !text-[clamp(2.8rem,8vw,8rem)]" />

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-lg leading-relaxed text-ink/80">
            Whether you're ready to book or simply curious, we'd love to hear from you. Reach out however suits you best.
          </p>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {[
              { href: `tel:${CONTACT.phoneTel}`, icon: Phone, label: "Call", value: CONTACT.phoneDisplay },
              { href: whatsappLink(), icon: MessageCircle, label: "WhatsApp", value: "Message us", ext: true },
              { href: `mailto:${CONTACT.email}`, icon: Mail, label: "Email", value: CONTACT.email },
            ].map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})} className="group flex items-center gap-5 py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-ivory transition-transform duration-500 group-hover:-rotate-12">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-coffee">{c.label}</span>
                    <span className="mt-1 block break-all font-serif text-xl text-forest">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-forest transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
          <div className="relative overflow-hidden rounded-sm bg-card p-8 shadow-[var(--shadow-soft)] md:p-14">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE, duration: 0.8 }} className="py-10 text-center" role="status">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-forest-deep">
                    <Check className="h-7 w-7" />
                  </span>
                  <h2 className="mt-8 text-4xl text-forest">Your enquiry is ready.</h2>
                  <p className="mx-auto mt-4 max-w-md text-ink/75">
                    WhatsApp has opened with your details ready to send. If it didn't open, use the button below.
                  </p>
                  <a href={sent} target="_blank" rel="noreferrer" className="btn-primary mt-8">
                    Send on WhatsApp <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button onClick={() => setSent(null)} className="link-underline mt-6 block w-full text-sm text-coffee">Edit my enquiry</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-10" exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-3xl text-forest md:text-4xl">Request a consultation</h2>
                  <Field id="name" label="Your name" error={errors.name}>
                    <input id="name" name="name" autoComplete="name" className={inputCls} placeholder="First and last name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                  </Field>
                  <Field id="contact" label="Phone or email" error={errors.contact}>
                    <input id="contact" name="contact" className={inputCls} placeholder="How should we reach you?" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-err" : undefined} />
                  </Field>
                  <Field id="interest" label="Area of interest" error={errors.interest}>
                    <select id="interest" name="interest" defaultValue={interest ?? ""} className={inputCls} aria-invalid={!!errors.interest}>
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                      <option value="partnership">Partnership enquiry</option>
                      <option value="other">Something else</option>
                    </select>
                  </Field>
                  <Field id="message" label="Message (optional)">
                    <textarea id="message" name="message" rows={4} className={inputCls + " resize-none"} placeholder="Tell us a little about your goals" />
                  </Field>
                  <button type="submit" className="btn-primary">
                    Send on WhatsApp <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
