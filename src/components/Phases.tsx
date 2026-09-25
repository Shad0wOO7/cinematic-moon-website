import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionTag } from "./Kit";

const PHASES = [
  {
    name: "Nouvelle Lune",
    desc: "La face cachée à la lumière. La Lune repose entre la Terre et le Soleil — invisible, mais déjà en marche.",
    illum: 0,
  },
  {
    name: "Premier Croissant",
    desc: "Un fil de lumière s'allume à l'ouest. Le ciel la dessine comme un sourire suspendu.",
    illum: 12,
  },
  {
    name: "Premier Quartier",
    desc: "La moitié du disque s'embrase. L'ombre et la clarté se partagent le monde.",
    illum: 50,
  },
  {
    name: "Gibbeuse Croissante",
    desc: "Elle enfle de nuit en nuit, promesse d'une lumière totale.",
    illum: 75,
  },
  {
    name: "Pleine Lune",
    desc: "Le disque entier irradie. Les marées se souviennent, les loups chantent, les nuits s'éclaircissent.",
    illum: 100,
  },
  {
    name: "Gibbeuse Décroissante",
    desc: "La lumière se retire par l'est, comme une mer qui reflue.",
    illum: 75,
  },
  {
    name: "Dernier Quartier",
    desc: "De nouveau, l'équilibre — puis la moitié s'éteint doucement.",
    illum: 50,
  },
  {
    name: "Dernier Croissant",
    desc: "Un dernier fil de lune avant le retour à l'obscur. Le cycle est éternel.",
    illum: 12,
  },
];

export default function Phases() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // New moon (shadow covers disc) -> full moon -> new moon
  const shadowX = useTransform(scrollYProgress, [0, 0.5, 1], [118, -118, 118]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.15, 0.35, 0.9, 0.35, 0.15]);
  const ringRotation = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const phaseIndex = useTransform(scrollYProgress, (p) =>
    Math.min(7, Math.floor(p * 8))
  );
  useMotionValueEvent(phaseIndex, "change", (v) => setPhase(v));

  return (
    <section id="phases" ref={ref} className="relative z-10 h-[460vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          {/* Moon */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,228,214,0.28),rgba(212,168,106,0.1)_45%,transparent_70%)] blur-2xl"
            />

            {/* Orbit dots */}
            <div className="absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2">
              <motion.div style={{ rotate: ringRotation }} className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-moon/40 shadow-[0_0_10px_rgba(233,228,214,0.6)]"
                    style={{
                      transform: `rotate(${i * 45}deg) translateX(32vmin)`,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <motion.svg
              viewBox="0 0 240 240"
              className="relative h-[54vmin] w-[54vmin] max-w-[520px] drop-shadow-[0_0_70px_rgba(210,205,190,0.28)]"
            >
              <defs>
                <radialGradient id="limb" cx="50%" cy="50%" r="50%">
                  <stop offset="72%" stopColor="rgba(4,6,15,0)" />
                  <stop offset="100%" stopColor="rgba(4,6,15,0.55)" />
                </radialGradient>
                <mask id="phaseMask">
                  <rect width="240" height="240" fill="white" />
                  <motion.circle cx={shadowX} cy={120} r={121} fill="black" />
                </mask>
              </defs>

              <g mask="url(#phaseMask)">
                {/* Texture */}
                <image
                  href="/images/moon-hero.jpg"
                  x="0"
                  y="0"
                  width="240"
                  height="240"
                  preserveAspectRatio="xMidYMid slice"
                />
                {/* Subtle craters */}
                <circle cx="88" cy="82" r="18" fill="rgba(90,85,75,0.28)" />
                <circle cx="152" cy="104" r="12" fill="rgba(90,85,75,0.22)" />
                <circle cx="126" cy="162" r="26" fill="rgba(90,85,75,0.2)" />
                <circle cx="66" cy="150" r="9" fill="rgba(90,85,75,0.26)" />
                <circle cx="172" cy="176" r="7" fill="rgba(90,85,75,0.24)" />
                <circle cx="110" cy="52" r="8" fill="rgba(90,85,75,0.2)" />
                {/* Limb darkening */}
                <circle cx="120" cy="120" r="120" fill="url(#limb)" />
              </g>
            </motion.svg>

            <div className="absolute bottom-[2vmin] left-1/2 -translate-x-1/2 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-moon-dim">
                Le visage change — vous faites le temps
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="flex min-h-[46vh] flex-col justify-center lg:min-h-[60vh] lg:pl-6">
            <div className="mb-8 lg:mb-0 lg:-mt-10">
              <SectionTag index="02" label="Les Huit Visages" />
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex gap-2.5">
                {PHASES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === phase
                        ? "w-8 bg-gold"
                        : i < phase
                          ? "w-1.5 bg-moon/50"
                          : "w-1.5 bg-moon/15"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-moon-dim">
                {String(phase + 1).padStart(2, "0")} / 08
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -26, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="mt-8 font-display text-5xl font-light italic text-shine md:text-7xl">
                  {PHASES[phase].name}
                </h3>
                <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-moon/70 md:text-base">
                  {PHASES[phase].desc}
                </p>
                <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-gold/90">
                  Illumination — {PHASES[phase].illum} %
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
