import { motion } from "framer-motion";
import { scrollToId, scrollToTop } from "../lib/scroll";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-outline font-display text-[20vw] font-semibold leading-[0.85] tracking-[0.05em] md:text-[13vw]"
            >
              LUNE
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-6 max-w-md font-display text-lg font-light italic text-moon/60"
            >
              Conçue comme une lettre d'amour à notre satellite naturel — un
              voyage défilant, tourné sous la même lumière que vous regardez
              chaque nuit.
            </motion.p>
          </div>

          <div className="flex flex-col items-start gap-8 md:items-end">
            <nav className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
              {[
                { id: "voyage", label: "Le Voyage" },
                { id: "phases", label: "Phases" },
                { id: "histoire", label: "Histoire" },
                { id: "heritage", label: "Héritage" },
                { id: "avenir", label: "Avenir" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToId(l.id)}
                  data-cursor
                  className="text-[10px] uppercase tracking-[0.3em] text-moon-dim transition-colors duration-300 hover:text-gold"
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <button
              onClick={scrollToTop}
              data-cursor
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-moon/20 text-moon/70 transition-all duration-500 hover:border-gold hover:text-gold"
              aria-label="Remonter en haut"
            >
              <span className="transition-transform duration-500 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-[10px] uppercase tracking-[0.3em] text-moon-dim/70">
            © 2026 — Voyage cinématique · 384 400 km
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-moon-dim/70">
            Fait de nuit, sous la Lune 🌙
          </p>
        </div>
      </div>
    </footer>
  );
}
