import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Counter, FadeUp, SectionTag } from "./Kit";

const STATS = [
  { to: 384400, suffix: " km", label: "de la Terre, en moyenne", note: "La distance que la lumière franchit en 1,3 seconde." },
  { to: 27.3, decimals: 1, suffix: " jours", label: "pour une révolution complète", note: "Le mois lunaire sidéral — la danse au rythme des marées." },
  { to: 1.62, decimals: 2, suffix: " m/s²", label: "de gravité de surface", note: "Six fois moins que la Terre. Un pas devient un vol." },
  { to: 12, suffix: "", label: "humains ont marché dessus", note: "Tous américains, tous entre 1969 et 1972. Aucune femme — pour l'instant." },
  { to: 173, suffix: " °C", label: "d'écart thermique", note: "De −173 °C à l'ombre à +117 °C en plein soleil." },
  { to: 4.53, decimals: 2, suffix: " milliards", label: "d'années d'existence", note: "Née d'une collision cataclysmique entre la Terre et Théia." },
];

export default function Stats() {
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bgRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="faits" ref={bgRef} className="relative z-10 overflow-hidden py-32 md:py-44">
      {/* Earthrise backdrop */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 scale-110">
        <img
          src="/images/earthrise.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/40 to-night" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTag index="04" label="La Lune en chiffres" />
          <FadeUp delay={0.15}>
            <p className="max-w-sm font-display text-xl font-light italic text-moon/60">
              Quelques nombres pour mesurer l'immensité de notre voisine.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s, i) => (
            <FadeUp
              key={s.label}
              delay={(i % 3) * 0.12}
              className="group bg-night/85 p-8 transition-colors duration-500 hover:bg-night-2 md:p-10"
            >
              <p className="font-display text-5xl font-light text-shine md:text-6xl">
                <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-gold">
                {s.label}
              </p>
              <p className="mt-3 text-xs font-light leading-relaxed text-moon/50">
                {s.note}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
