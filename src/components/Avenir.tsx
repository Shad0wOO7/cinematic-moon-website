import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeUp, SectionTag } from "./Kit";
import { scrollToTop } from "../lib/scroll";

const PROJECTS = [
  {
    title: "Gateway",
    tag: "Station orbitale",
    desc: "Une station habitée autour de la Lune, porte d'entrée des futures missions vers la surface et vers Mars.",
  },
  {
    title: "Artemis Base Camp",
    tag: "Pôle Sud lunaire",
    desc: "Une base permanente dans les cratères polaires, où l'eau gelée nourrit carburant et respiration.",
  },
  {
    title: "Moonlight",
    tag: "Constellation & réseaux",
    desc: "Communication, positionnement et énergie : une infrastructure lunaire pour la génération qui revient.",
  },
];

export default function Avenir() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="avenir" ref={ref} className="relative z-10 overflow-hidden py-32 md:py-48">
      {/* Backdrop */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 scale-[1.15]">
        <img
          src="/images/artemis.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />
      </motion.div>

      {/* Ghost word */}
      <motion.p
        style={{ x: ghostX }}
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[26vw] font-semibold uppercase tracking-[0.08em]"
      >
        Artémis
      </motion.p>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTag index="06" label="L'Avenir" />

        <div className="mt-12 max-w-3xl">
          <FadeUp>
            <h2 className="font-display text-5xl font-light leading-tight text-moon md:text-7xl">
              Demain, <span className="italic text-gold">on y retourne.</span>
              <br />
              Et cette fois, pour rester.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-moon/70 md:text-base">
              Avec le programme Artémis, la Lune redevient une destination.
              Un terrain d'entraînement, un relais, un foyer d'humanité hors du
              monde — avant le saut vers Mars.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.14}>
              <article
                data-cursor
                className="glass group relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 md:p-10"
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(212,168,106,0.2),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  {p.tag}
                </span>
                <h3 className="mt-5 font-display text-3xl font-light italic text-moon">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-moon/60">
                  {p.desc}
                </p>
                <div className="mt-8 h-px w-10 bg-gold/50 transition-all duration-700 group-hover:w-full" />
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-24 flex flex-col items-center gap-6 text-center">
          <p className="font-display text-2xl font-light italic text-moon/70">
            « Nous sommes les explorateurs du ciel profond. »
          </p>
          <button
            onClick={scrollToTop}
            data-cursor
            className="group flex items-center gap-4 rounded-full border border-moon/25 px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-moon transition-all duration-500 hover:border-gold hover:text-gold"
          >
            Reprendre le voyage
            <span className="transition-transform duration-500 group-hover:-translate-y-1.5">
              ↑
            </span>
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
