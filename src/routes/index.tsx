import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import heroBowl from "@/assets/hero-bowl.jpg";
import sprout from "@/assets/sprout.jpg";
import consult from "@/assets/consult.jpg";
import { SERVICES } from "@/lib/site";
import { SplitHeadline, Reveal, EASE } from "@/components/site/motion";
import { BotanicalBranch, RotatingBadge } from "@/components/site/Botanical";
import { ClosingCta } from "@/components/site/ClosingCta";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageSeo({
    title: "ILANA Nutrition & Diet | Personalised Food & Wellness",
    description: "Discover ILANA Nutrition & Wellness for personalised nutrition, healthy eating guidance and practical diet support. Explore tailored food and nutrition services for every stage of life.",
    path: "/",
  }),
  component: Home,
});

const ROTATING = ["body.", "energy.", "growth.", "everyday."];

function RotatingWord() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span className="relative inline-block overflow-hidden pb-[0.1em] align-bottom">
      <motion.span
        key={ROTATING[i]}
        className="inline-block italic text-terracotta"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {ROTATING[i]}
      </motion.span>
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const d = 4.3;

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-7">
          <motion.p className="eyebrow flex items-center gap-3 text-coffee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d }}>
            <motion.span className="inline-block h-px bg-coffee" initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: d, duration: 1, ease: EASE }} />
            Personalised nutrition · Lasting wellness
          </motion.p>
          <SplitHeadline as="h1" immediate delay={d} text={"ILANA Nutrition & Wellness:\nPersonalised Nutrition for Every Stage of Life"} className="display mt-6 text-forest" />
          <motion.p
            className="display font-serif text-forest"
            style={{ fontWeight: 350, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.3, duration: 1, ease: EASE }}
            aria-hidden="true"
          >
            <RotatingWord />
          </motion.p>
          <motion.p className="mt-4 font-serif text-2xl italic text-coffee md:text-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.6, duration: 1 }}>
            Flourish in your life.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.8, duration: 1, ease: EASE }}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/80">
              Personalised nutrition for every stage of life, every goal, and every journey towards feeling your best.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link to="/contact" className="btn-primary">
                Book a Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="btn-ghost link-underline text-forest">Discover ILANA</Link>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-t-[999px] shadow-[var(--shadow-soft)] lg:w-full"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: d - 0.2, duration: 1.4, ease: EASE }}
          >
            <motion.img
              src={heroBowl}
              alt="A nourishing bowl of grains, roasted squash, avocado and pomegranate"
              width={1024}
              height={1280}
              style={{ y: imgY, scale: 1.15 }}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: smallY }}
            className="absolute -bottom-6 left-0 w-[38%] overflow-hidden rounded-[2px] border-[6px] border-ivory shadow-[var(--shadow-soft)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: d + 0.6, duration: 1, ease: EASE }}
          >
            <img src={sprout} alt="A young sprout growing in a terracotta pot" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          <motion.div className="absolute -top-4 left-4 text-forest md:left-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 1 }}>
            <RotatingBadge text="Nourish · Grow · Thrive · ILANA · " className="rounded-full bg-ivory" />
          </motion.div>
        </div>
      </div>
      <motion.div className="container-x mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink/60 lg:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 1.2 }}>
        <ArrowDown className="h-4 w-4 animate-bounce" /> Scroll to explore
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["Personalised", "Practical", "Sustainable", "Nourishing", "Evidence-informed", "Kind"];
  return (
    <div className="overflow-hidden border-y border-border bg-ivory-deep py-6" aria-hidden="true">
      <div className="marquee flex w-max gap-12 whitespace-nowrap font-serif text-3xl italic text-forest md:text-4xl">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w} <span className="text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="container-x relative py-28 md:py-40">
      <BotanicalBranch className="pointer-events-none absolute -left-6 top-10 hidden h-[420px] opacity-40 md:block" />
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <p className="eyebrow text-coffee">The ILANA philosophy</p>
          <SplitHeadline
            text={"Good nutrition changes more\nthan your plate. It changes\n*how* you live."}
            className="h-section mt-6 text-forest"
          />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/80">
                At ILANA, nutrition isn't about rules, restriction or perfection. It's about understanding you - your goals, your
                routine, your culture and the foods you love - and building something that genuinely fits.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink/80">
                Our work is personalised, practical and sustainable: small, meaningful changes that grow into lasting habits, so you
                can feel stronger, steadier and more at home in your body.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeSupport() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-forest text-ivory grain">
      <div className="container-x py-28 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">Who we support</p>
            <SplitHeadline text={"Nutrition for every\n*season* of life."} className="h-section mt-6" />
          </div>
          <Link to="/services" className="link-underline text-sm font-semibold">All services →</Link>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <ol className="lg:col-span-7">
            {SERVICES.map((s, i) => (
              <li key={s.slug} className="border-t border-ivory/15 last:border-b">
                <Link
                  to="/services"
                  hash={s.slug}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-start gap-6 py-7 md:gap-10"
                >
                  <span className={"eyebrow pt-3 transition-colors " + (active === i ? "text-gold" : "text-ivory/40")}>0{i + 1}</span>
                  <span className="flex-1">
                    <span className={"block font-serif text-3xl transition-all duration-500 md:text-5xl " + (active === i ? "translate-x-2 italic" : "")}>
                      {s.title}
                    </span>
                    <span className={"grid transition-all duration-500 " + (active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="mt-3 block max-w-md text-ivory/75">{s.short}</span>
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className={"mt-3 h-6 w-6 shrink-0 transition-all duration-500 " + (active === i ? "rotate-45 text-gold" : "opacity-40")} />
                </Link>
              </li>
            ))}
          </ol>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-t-[999px]">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={SERVICES[active]!.slug}
                  src={SERVICES[active]!.image}
                  alt={SERVICES[active]!.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Consult & Assess", d: "We take time to understand your goals, lifestyle, food preferences and needs." },
  { n: "02", t: "Build Your Plan", d: "Together we shape practical, personalised nutrition strategies that suit your life." },
  { n: "03", t: "Support Your Progress", d: "We review how things are going and adapt recommendations as you grow." },
];

function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="container-x py-28 md:py-40">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-coffee">The ILANA approach</p>
          <SplitHeadline text={"Three steps,\none *living* plan."} className="h-section mt-6 text-forest" />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <img src={consult} alt="Writing a personalised nutrition plan" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-sm object-cover shadow-[var(--shadow-soft)]" />
        </Reveal>
      </div>
      <div ref={ref} className="relative mt-24">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
        <motion.div style={{ scaleX }} className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gold md:block" />
        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15}>
              <div className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ivory font-serif text-lg text-forest">
                  {s.n}
                </span>
                <h3 className="mt-8 text-3xl text-forest md:text-4xl">{s.t}</h3>
                <p className="mt-4 max-w-xs leading-relaxed text-ink/75">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY: [string, string][] = [
  ["Personalised", "Guidance shaped around you - not one-size-fits-all advice."],
  ["Sustainable", "Habits you can keep, rather than extreme restrictions."],
  ["Practical", "Nutrition that fits real kitchens, budgets and busy days."],
  ["Tailored", "Support that respects your goals and circumstances."],
  ["Long-term", "A lasting commitment to healthier living, step by step."],
];

function Why() {
  return (
    <section className="bg-ivory-deep">
      <div className="container-x py-28 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-coffee">Why ILANA</p>
              <SplitHeadline text={"Care that\n*grows* with you."} className="h-section mt-6 text-forest" />
              <BotanicalBranch className="mt-10 hidden h-64 text-coffee lg:block" />
            </div>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {WHY.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <li className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-10 md:gap-12">
                  <span className="font-serif text-6xl italic text-gold transition-colors duration-500 group-hover:text-terracotta md:text-8xl">{t.charAt(0)}</span>
                  <div>
                    <h3 className="text-3xl text-forest md:text-4xl">{t}</h3>
                    <p className="mt-3 max-w-md text-lg text-ink/75">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Partnerships() {
  const partners = ["Gyms & studios", "Hospitals & clinics", "Fitness professionals", "Workplaces", "Schools", "Wellness organisations"];
  return (
    <section className="container-x py-28 md:py-40">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-coffee">Future partnerships</p>
          <SplitHeadline text={"Better health grows\nthrough *collaboration*."} className="h-section mt-6 text-forest" />
        </div>
        <Reveal delay={0.2} className="lg:pt-14">
          <p className="text-lg leading-relaxed text-ink/80">
            ILANA hopes to work alongside organisations that share a commitment to nutrition, health and wellbeing - bringing
            personalised nutrition support to teams, members, patients and communities.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {partners.map((p) => (
              <span key={p} className="rounded-full border border-forest/25 px-5 py-2.5 text-sm text-forest transition-colors duration-300 hover:bg-forest hover:text-ivory">
                {p}
              </span>
            ))}
          </div>
          <Link to="/contact" className="btn-ghost link-underline mt-10 text-forest">Start a conversation →</Link>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <div className="mt-16"><Marquee /></div>
      <Intro />
      <WhoWeSupport />
      <Approach />
      <Why />
      <Partnerships />
      <ClosingCta />
    </>
  );
}
