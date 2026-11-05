import { createFileRoute } from "@tanstack/react-router";
import ingredients from "@/assets/ingredients.jpg";
import consult from "@/assets/consult.jpg";
import { SplitHeadline, Reveal } from "@/components/site/motion";
import { BotanicalBranch, RotatingBadge } from "@/components/site/Botanical";
import { ClosingCta } from "@/components/site/ClosingCta";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageSeo({
    title: "About ILANA | Our Nutrition & Wellness Approach",
    description: "Learn about ILANA's compassionate, practical approach to personalised nutrition, sustainable habits and healthier living.",
    path: "/about",
  }),
  component: About,
});

const VALUES = [
  ["Empathy", "We listen first. Every person's relationship with food is different, and deserves respect."],
  ["Practicality", "Advice is only useful if it works on a Tuesday night. We keep things real."],
  ["Sustainability", "Small steps that last will always beat dramatic changes that don't."],
  ["Education", "We explain the why, so you can make confident choices on your own."],
  ["Individual wellbeing", "Your health, your goals, your pace - at the centre of everything."],
];

function About() {
  return (
    <>
      <section className="container-x relative pt-36 pb-20 md:pt-44">
        <p className="eyebrow text-coffee">About ILANA</p>
        <SplitHeadline as="h1" immediate text={"Rooted in nourishment.\nGrowing towards *flourishing*."} className="display mt-6 max-w-6xl text-forest !text-[clamp(2.8rem,7vw,7rem)]" />
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-7">
            <img src={ingredients} alt="Fresh fruits, nuts, lentils and greens on a dark green surface" width={1600} height={912} className="aspect-[16/10] w-full rounded-sm object-cover shadow-[var(--shadow-soft)]" />
            <RotatingBadge text="Nourish · Grow · Thrive · ILANA · " className="absolute -bottom-12 right-6 rounded-full bg-ivory text-forest" />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:pt-20">
            <p className="font-serif text-2xl leading-snug text-forest md:text-3xl">
              “Ilana” evokes a tree - something that starts small, takes root, and keeps on growing.
            </p>
            <p className="mt-6 leading-relaxed text-ink/75">
              That idea sits at the heart of everything we do. Nourishment is the soil; healthy habits are the roots; and a full,
              energetic life is what grows from them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest text-ivory grain">
        <div className="container-x grid gap-16 py-28 md:py-36 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Our story</p>
            <SplitHeadline text={"Nutrition is not a diet.\nIt's a *foundation*."} className="h-section mt-6" />
          </div>
          <Reveal delay={0.15} className="space-y-6 text-lg leading-relaxed text-ivory/80 lg:pt-16">
            <p>
              ILANA was created from a simple belief: that good food, understood well, can change how people feel, perform and live
              - at every age and stage.
            </p>
            <p>
              Too often, nutrition advice is loud, extreme or impossible to follow. We wanted to offer something calmer and kinder:
              personalised guidance that respects culture, budget, preferences and real life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-28 md:py-36">
        <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2">
          {[
            ["Mission", "To help people build healthier lives through personalised nutrition, sustainable habits and caring, practical support."],
            ["Vision", "A future where everyone has access to nutrition guidance that fits their life - and the confidence to thrive."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.15} className="bg-ivory p-10 md:p-16">
              <p className="eyebrow text-terracotta">Our {t?.toLowerCase()}</p>
              <p className="mt-6 font-serif text-3xl leading-snug text-forest md:text-4xl">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory-deep">
        <div className="container-x grid items-center gap-16 py-28 md:py-36 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <img src={consult} alt="A personalised nutrition plan being written" loading="lazy" width={1280} height={960} className="aspect-[4/5] w-full rounded-t-[999px] object-cover" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-coffee">Our approach</p>
            <SplitHeadline text={"Personal, practical,\nand *patient*."} className="h-section mt-6 text-forest" />
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg leading-relaxed text-ink/80">
                Every consultation begins with listening. We look at your goals, daily rhythm, food preferences and any health
                considerations - then build a plan you can actually follow, and adjust it as life changes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x relative py-28 md:py-36">
        <BotanicalBranch className="pointer-events-none absolute right-0 top-10 hidden h-96 opacity-40 lg:block" />
        <p className="eyebrow text-coffee">What we value</p>
        <SplitHeadline text={"Five values,\none *root* system."} className="h-section mt-6 text-forest" />
        <ol className="mt-16">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <li className="group grid gap-4 border-t border-border py-10 md:grid-cols-12 md:items-baseline">
                <span className="eyebrow text-gold md:col-span-1">0{i + 1}</span>
                <h3 className="text-4xl text-forest transition-all duration-500 group-hover:translate-x-2 group-hover:italic md:col-span-5 md:text-5xl">{t}</h3>
                <p className="text-lg text-ink/75 md:col-span-5 md:col-start-8">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <ClosingCta />
    </>
  );
}
