import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

type Props = { onDone: () => void };

export default function Preloader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    const t = setTimeout(onDone, 3100);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night"
      exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Moon phase cycle */}
      <div className="relative mb-10">
        <div className="absolute inset-0 scale-150 rounded-full bg-[radial-gradient(circle,rgba(212,168,106,0.16),transparent_65%)] blur-xl" />
        <svg viewBox="0 0 200 200" className="relative h-32 w-32 md:h-40 md:w-40">
          <defs>
            <mask id="preloaderMask">
              <rect width="200" height="200" fill="white" />
              <motion.circle
                cx={110}
                cy="100"
                r="101"
                fill="black"
                animate={{ cx: [-110, 110] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </mask>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="99"
            fill="#e9e4d6"
            mask="url(#preloaderMask)"
          />
        </svg>
      </div>

      <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.45em] text-moon-dim">
        En route vers la Lune
      </p>

      <div className="relative h-px w-56 overflow-hidden bg-white/10 md:w-72">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-soft to-gold"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-6 font-display text-3xl font-light tabular-nums text-moon/80">
        {progress}
        <span className="text-lg text-moon-dim">%</span>
      </p>

      <p className="absolute bottom-10 text-[9px] uppercase tracking-[0.35em] text-moon-dim/60">
        Trajectoire de transfert · 384 400 km
      </p>
    </motion.div>
  );
}
