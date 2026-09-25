import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  { id: "voyage", label: "Le Voyage" },
  { id: "phases", label: "Phases" },
  { id: "histoire", label: "Histoire" },
  { id: "heritage", label: "Héritage" },
  { id: "avenir", label: "Avenir" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 50));
  }, [scrollY]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ${
          scrolled
            ? "border-b border-white/5 bg-night/70 py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => go("hero")}
            className="group flex items-center gap-3"
            data-cursor
          >
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute inset-0 rounded-full bg-moon shadow-[0_0_18px_rgba(233,228,214,0.8)] transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-night/90" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.5em] text-moon">
              Lune
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-cursor
                className="group relative text-[11px] font-medium uppercase tracking-[0.28em] text-moon-dim transition-colors duration-300 hover:text-moon"
              >
                <span className="mr-1.5 text-[9px] text-gold/70">0{i + 1}</span>
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Burger */}
          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor
            className="relative z-[95] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-moon"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6 bg-moon"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-moon"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(140% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[85] flex flex-col items-center justify-center gap-2 bg-night-2/95 backdrop-blur-2xl md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.7 }}
                onClick={() => go(l.id)}
                className="group py-3"
              >
                <span className="font-display text-4xl font-light text-moon/90 transition-colors group-hover:text-gold">
                  {l.label}
                </span>
              </motion.button>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-[10px] uppercase tracking-[0.4em] text-moon-dim"
            >
              384 400 km de la Terre
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
