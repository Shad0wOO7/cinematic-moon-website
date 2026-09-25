import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ---------- Section label ---------- */
export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4"
    >
      <span className="font-display text-lg italic text-gold">{index}</span>
      <span className="h-px w-12 bg-gradient-to-r from-gold/70 to-transparent" />
      <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-moon-dim">
        {label}
      </span>
    </motion.div>
  );
}

/* ---------- Word by word scroll reveal ---------- */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <span className="relative mr-[0.28em] inline-block overflow-hidden pb-[0.12em]">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export function RevealWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.42"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.4,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = val
    .toFixed(decimals)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------- Generic whileInView reveal ---------- */
export function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
