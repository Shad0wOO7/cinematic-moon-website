import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealWords, SectionTag } from "./Kit";

export default function Voyage() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const captionOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  return (
    <section id="voyage" className="relative z-10 px-6 py-32 md:py-44 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionTag index="01" label="Le Voyage" />

        <div className="mt-14 md:mt-20">
          <RevealWords
            text="Elle tourne autour de nous depuis quatre milliards d'années. Marée, lumière, mystère — la Lune gouverne nos nuits. Ce site est une traversée : un film que vous déroulez vous-même, à travers ses phases, son histoire et ceux qui ont marché sur sa poussière."
            className="font-display text-3xl font-light leading-[1.35] text-moon/90 md:text-5xl md:leading-[1.3]"
          />
        </div>
      </div>

      {/* Parallax surface image */}
      <div
        ref={imgWrapRef}
        className="relative mx-auto mt-28 max-w-6xl overflow-hidden rounded-2xl border border-white/10 md:mt-40"
        data-cursor
      >
        <motion.div style={{ y: imgY }} className="scale-[1.18]">
          <img
            src="/images/surface.jpg"
            alt="La surface lunaire sous une lumière rasante"
            className="h-[70vh] w-full object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/30" />
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            Mer de la Tranquillité
          </p>
          <p className="mt-2 font-display text-lg italic text-moon/80 md:text-2xl">
            Où l'ombre ne pardonne pas
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl md:mt-24">
        <RevealWords
          text="Chaque section est un acte. Chaque défilement, un travelling. Ici, pas de page : un couloir d'orbite que la lumière traverse — de la nouvelle lune à la pleine clarté."
          className="font-display text-2xl font-light italic leading-relaxed text-moon/70 md:text-4xl"
        />
      </div>
    </section>
  );
}
