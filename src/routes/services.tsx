import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { SERVICES, SPORTS_IMAGES } from "@/lib/site";
import { SplitHeadline, Reveal } from "@/components/site/motion";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Nutrition Services - ILANA Nutrition & Wellness" },
      { name: "description", content: "Weight management, sports nutrition, pregnancy & postpartum, child, older adult and health-condition nutrition support." },
      { property: "og:title", content: "Nutrition Services - ILANA" },
      { property: "og:description", content: "Six areas of personalised nutrition support for every stage of life." },
    ],
  }),
  component: Services,
});

function SportsSlideshow({ alt }: { alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % SPORTS_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]">
      {SPORTS_IMAGES.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={index === activeIndex ? alt : ""}
          aria-hidden={index !== activeIndex}
          loading={index === 0 ? "eager" : "lazy"}
          width={1024}
          height={1280}
          className={"absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out " + (index === activeIndex ? "opacity-100" : "opacity-0")}
        />
      ))}
    </div>
  );
}

function Services() {
  return (
    <>
      <section className="container-x pt-36 pb-16 md:pt-44">
        <p className="eyebrow text-coffee">Services</p>
        <SplitHeadline as="h1" immediate text={"Six ways we help\nyou *thrive*."} className="display mt-6 text-forest !text-[clamp(2.8rem,8vw,8rem)]" />
        <div className="mt-12 flex flex-wrap gap-3">
          {SERVICES.map((s, i) => (
            <a key={s.slug} href={`#${s.slug}`} className="rounded-full border border-forest/25 px-5 py-2.5 text-sm text-forest transition-colors hover:bg-forest hover:text-ivory">
              <span className="mr-2 text-gold">0{i + 1}</span>{s.title}
            </a>
          ))}
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const dark = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={"scroll-mt-20 " + (dark ? "bg-forest text-ivory grain" : "")}>
            <div className="container-x grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
              <Reveal className={"relative lg:col-span-5 " + (dark ? "lg:order-2 lg:col-start-8" : "")}>
                {s.slug === "sports" ? (
                  <SportsSlideshow alt={s.alt} />
                ) : (
                  <div className="overflow-hidden rounded-t-[999px]">
                    <img src={s.image} alt={s.alt} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] ease-out hover:scale-105" />
                  </div>
                )}
                <span className={"absolute -top-6 font-serif text-[7rem] leading-none italic md:text-[10rem] " + (dark ? "-left-4 text-gold" : "-right-4 text-terracotta")}>
                  0{i + 1}
                </span>
              </Reveal>
              <div className={"lg:col-span-6 " + (dark ? "lg:order-1" : "lg:col-start-7")}>
                <p className={"eyebrow " + (dark ? "text-gold" : "text-coffee")}>Service 0{i + 1}</p>
                <SplitHeadline text={s.title} className="h-section mt-5" />
                <Reveal delay={0.15}>
                  <p className={"mt-6 font-serif text-2xl italic " + (dark ? "text-ivory/90" : "text-forest")}>{s.short}</p>
                  <p className={"mt-6 text-lg leading-relaxed " + (dark ? "text-ivory/75" : "text-ink/75")}>{s.long}</p>
                  <p className={"eyebrow mt-10 " + (dark ? "text-gold" : "text-coffee")}>Ideal for</p>
                  <ul className="mt-4 space-y-3">
                    {s.forWho.map((w) => (
                      <li key={w} className="flex items-center gap-3">
                        <Check className={"h-4 w-4 " + (dark ? "text-gold" : "text-terracotta")} /> {w}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" search={{ interest: s.slug }} className={(dark ? "btn-gold" : "btn-primary") + " mt-10"}>
                    Book a consultation <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section className="container-x py-16">
        <p className="mx-auto max-w-2xl text-center text-sm text-ink/60">
          ILANA provides nutrition guidance that complements - and never replaces - care from your doctor. Results vary from person to
          person, and we don't promise cures or specific outcomes.
        </p>
      </section>
      <ClosingCta />
    </>
  );
}
