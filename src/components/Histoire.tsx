import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionTag } from "./Kit";
import { scrollToId } from "../lib/scroll";

type Mission = {
  year: string;
  country: string;
  title: string;
  desc: string;
  badge?: string;
};

const MISSIONS: Mission[] = [
  {
    year: "1959",
    country: "URSS",
    title: "Luna 2",
    desc: "Le premier objet forgé par l'Homme touche la Lune. La surface reçoit son premier visiteur d'acier.",
  },
  {
    year: "1966",
    country: "URSS",
    title: "Luna 9",
    desc: "Premier atterrissage en douceur. Les premières images du sol lunaire reviennent sur Terre.",
  },
  {
    year: "1968",
    country: "États-Unis",
    title: "Apollo 8",
    desc: "Trois hommes s'échappent de l'orbite terrestre et contemplent le lever de Terre. Le monde découvre Earthrise.",
  },
  {
    year: "1969",
    country: "États-Unis",
    title: "Apollo 11",
    desc: "« Un petit pas pour l'homme, un bond de géant pour l'humanité. » Armstrong et Aldrin foulent la mer de la Tranquillité.",
    badge: "Premiers pas",
  },
  {
    year: "1972",
    country: "États-Unis",
    title: "Apollo 17",
    desc: "Cernan et Schmitt ferment le chapitre. Douze hommes ont marché sur la Lune — puis le silence, pendant un demi-siècle.",
  },
  {
    year: "2019",
    country: "Chine",
    title: "Chang'e 4",
    desc: "Premier atterrissage de l'histoire sur la face cachée, dans le cratère Von Kármán, avec le rover Yutu-2.",
  },
  {
    year: "2024",
    country: "États-Unis",
    title: "IM-1 Odysseus",
    desc: "Une entreprise privée repose sa machine sur la Lune. L'exploration change de mains et le ciel se repeuple.",
  },
  {
    year: "2027",
    country: "États-Unis",
    title: "Artemis III",
    desc: "Le retour de l'humanité au pôle Sud lunaire. Cette fois, pour rester — et pour partir plus loin.",
    badge: "À venir",
  },
];

export default function Histoire() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setRange(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 40)
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [40, -range]);
  const barScale = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  return (
    <section id="histoire" ref={sectionRef} className="relative z-10 h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <SectionTag index="03" label="Soixante ans d'exploration" />
          <div className="mt-8 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light text-moon/90 md:text-6xl">
              La frise du <span className="italic text-gold">temps lunaire</span>
            </h2>
            <p className="hidden max-w-xs pb-2 text-right text-[10px] uppercase tracking-[0.3em] text-moon-dim md:block">
              Continuez de défiler — le temps glisse latéralement
            </p>
          </div>
        </div>

        {/* Track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-12 flex w-max items-stretch gap-6 pl-6 pr-24 lg:pl-10"
        >
          {MISSIONS.map((m, i) => (
            <motion.article
              key={m.year}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold/40 sm:w-[380px] md:w-[420px] md:p-9 ${
                i % 2 === 1 ? "md:mt-10" : ""
              }`}
              data-cursor
            >
              {/* Decorative orb */}
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(212,168,106,0.14),transparent_70%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-moon-dim">
                    {m.country}
                  </span>
                  <span className="font-display text-lg italic text-moon/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-10 font-display text-6xl font-light italic text-shine md:text-7xl">
                  {m.year}
                </p>
                {m.badge && (
                  <span className="mt-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-gold">
                    {m.badge}
                  </span>
                )}
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold tracking-wide text-moon md:text-xl">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-moon/60">
                  {m.desc}
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-gold/50 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.article>
          ))}

          {/* End card */}
          <article className="flex w-[70vw] shrink-0 flex-col items-start justify-center rounded-2xl border border-dashed border-gold/30 bg-gold/[0.04] p-9 backdrop-blur-sm sm:w-[340px] md:w-[380px]">
            <span className="font-display text-6xl font-light italic text-gold/80">
              ∞
            </span>
            <h3 className="mt-8 font-display text-3xl font-light text-moon/90">
              Et maintenant&nbsp;?
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-moon/60">
              Une nouvelle course est engagée. Bases permanentes, orbite habitée,
              Mars en ligne de mire.
            </p>
            <button
              onClick={() => scrollToId("avenir")}
              data-cursor
              className="group/btn mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold"
            >
              Vers l'avenir
              <span className="transition-transform duration-500 group-hover/btn:translate-x-2">
                →
              </span>
            </button>
          </article>
        </motion.div>

        {/* Progress */}
        <div className="mx-auto mt-14 w-full max-w-7xl px-6 lg:px-10">
          <div className="h-px w-full bg-white/10">
            <motion.div
              style={{ scaleX: barScale }}
              className="h-px origin-left bg-gradient-to-r from-gold via-gold-soft to-moon"
            />
          </div>
          <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.3em] text-moon-dim">
            <span>1959</span>
            <span>Aujourd'hui</span>
            <span>Demain</span>
          </div>
        </div>
      </div>
    </section>
  );
}
