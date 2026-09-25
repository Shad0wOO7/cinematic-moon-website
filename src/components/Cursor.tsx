import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [data-cursor]") && !target.closest("canvas")
      );
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-moon/40 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 58 : 34,
          height: hovering ? 58 : 34,
          opacity: pressed ? 0.5 : 1,
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[91] rounded-full bg-moon mix-blend-difference"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 6 : 5, height: hovering ? 6 : 5, opacity: 1 }}
      />
    </>
  );
}
