import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionTag } from "./Kit";

const LANDINGS = [
  { mission: "Apollo 11", date: "1969", crew: "Armstrong · Aldrin · Collins" },
  { mission: "Apollo 12", date: "1969", crew: "Conrad · Bean · Gordon" },
  { mission: "Apollo 14", date: "1971", crew: "Shepard · Mitchell · Roosa" },
  { mission: "Apollo 15", date: "1971", crew: "Scott · Irwin · Worden" },
  { mission: "Apollo 16", date: "1972", crew: "Young · Duke · Mattingly" },
  { mission: "Apollo 17", date: "1972", crew: "Cernan · Schmitt · Evans" },
];

export default function Heritage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.22, 1.02]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const quoteOpacity = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const quoteBlur = useTransform(scrollYProgress, [0.22, 0.42], [10, 0]);
  const quoteY = useTransform(scrollYProgress, [0.22, 0.42], [60, 0]);
  const stripOpacity = useTransform(scrollYProgress, [0.7, 0.86], [0, 1]);

  return (
    <section id="heritage" ref={ref} className="relative z-10 h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Ken Burns image */}
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <img
            src="/images/astronaut.jpg"
            alt="Un astronaute regarde la Terre depuis la Lune"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/30 to-night" />
        <div className="absolute inset-0 bg-night/25" />

        {/* Quote */}
        <motion.blockquote
          style={{ opacity: quoteOpacity, filter: quoteBlur, y: quoteY }}
          className="relative z-10 max-w-5xl px-6 text-center"
        >
          <span className="font-display text-8xl leading-none text-gold/60">
            «
          </span>
          <p className="font-display text-3xl font-light italic leading-snug text-moon md:text-5xl">
            C'est un petit pas pour l'homme,
            <br className="hidden md:block" /> un bond de géant pour l'humanité.
          </p>
          <footer className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
              Neil Armstrong
            </p>
            <p className="mt-2 text-xs text-moon/50">
              Mer de la Tranquillité — 21 juillet 1969, 02:56 UTC
            </p>
          </footer>
        </motion.blockquote>

        {/* Mission strip */}
        <motion.div
          style={{ opacity: stripOpacity }}
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-night/60 backdrop-blur-md"
        >
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
            <SectionTag index="05" label="Douze hommes, six missions" />
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {LANDINGS.map((l) => (
                <div key={l.mission} className="group" data-cursor>
                  <p className="text-xs font-semibold tracking-wider text-moon transition-colors group-hover:text-gold">
                    {l.mission}
                  </p>
                  <p className="mt-1 font-display text-lg italic text-moon/50">
                    {l.date}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-moon-dim/70">
                    {l.crew}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
