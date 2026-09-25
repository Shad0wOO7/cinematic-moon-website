import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const TITLE = "LUNE";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven cinematic zoom
  const moonScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const moonY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const darken = useTransform(scrollYProgress, [0.3, 1], [0, 0.9]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const moonX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const moonYPar = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const titleX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const titleYPar = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative h-[160vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Moon */}
        <motion.div
          style={{ scale: moonScale, y: moonY, x: moonX }}
          className="absolute flex items-center justify-center"
        >
          <motion.div style={{ y: moonYPar }} className="relative">
            {/* Halo */}
            <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(212,168,106,0.14),rgba(140,160,200,0.06)_45%,transparent_70%)] blur-2xl" />
            {/* Orbital ring */}
            <div className="animate-spin-slower absolute inset-[-14%] rounded-full border border-dashed border-moon/15">
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,168,106,0.9)]" />
            </div>
            <div className="animate-spin-slow absolute inset-[-26%] rounded-full border border-moon/5">
              <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-moon/60" />
            </div>
            {/* Moon disc */}
            <div className="relative h-[76vmin] w-[76vmin] overflow-hidden rounded-full shadow-[0_0_120px_rgba(180,190,220,0.18)] [mask-image:radial-gradient(circle_at_50%_50%,black_62%,transparent_98%)]">
              <img
                src="/images/moon-hero.jpg"
                alt="La Lune en pleine clarté"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(4,6,15,0.55)_100%)]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Title block */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity, x: titleX }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <motion.div style={{ y: titleYPar }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-[10px] font-medium uppercase tracking-[0.6em] text-gold md:text-xs"
            >
              Voyage cinématique
            </motion.p>

            <h1 className="flex justify-center overflow-hidden pb-2">
              {TITLE.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 3.7 + i * 0.12,
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-shine font-display text-[34vw] font-light leading-[0.95] tracking-[0.06em] md:text-[24vw]"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-xl font-light italic text-moon/85 md:text-3xl"
            >
              à 384 400 kilomètres de la Terre
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              {["27,3 jours d'orbite", "4,5 milliards d'années", "12 humains l'ont foulée"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-moon/15 bg-moon/[0.04] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-moon/70 backdrop-blur-sm md:text-[11px]"
                  >
                    {chip}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.4, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.45em] text-moon-dim">
            Défiler pour embarquer
          </span>
          <span className="relative h-14 w-px overflow-hidden bg-white/10">
            <span className="animate-pulse-line absolute inset-0 bg-gradient-to-b from-gold to-transparent" />
          </span>
        </motion.div>

        {/* Darkening on scroll */}
        <motion.div
          style={{ opacity: darken }}
          className="pointer-events-none absolute inset-0 bg-night"
        />
      </div>
    </section>
  );
}
