import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  speed: number;
  phase: number;
  parallax: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let raf = 0;
    let scrollY = window.scrollY;

    const count = Math.min(260, Math.floor((width * height) / 6500));
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.25,
      baseAlpha: Math.random() * 0.55 + 0.25,
      speed: Math.random() * 1.6 + 0.3,
      phase: Math.random() * Math.PI * 2,
      parallax: Math.random() * 0.25 + 0.04,
    }));

    const meteors: Meteor[] = [];
    let lastMeteor = performance.now();

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.5;
      meteors.push({
        x: fromLeft ? -40 : Math.random() * width,
        y: Math.random() * height * 0.4,
        vx: (fromLeft ? 1 : -1) * (Math.random() * 3.5 + 5),
        vy: Math.random() * 2 + 1.4,
        life: 0,
        maxLife: Math.random() * 55 + 40,
      });
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      const py = scrollY * 0.12;

      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        const alpha = s.baseAlpha * (0.35 + 0.65 * tw);
        let y = s.y - py * s.parallax;
        y = ((y % height) + height) % height;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 244, ${alpha})`;
        ctx.fill();
        if (s.r > 1.15) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190, 205, 235, ${alpha * 0.12})`;
          ctx.fill();
        }
      }

      // Meteors
      if (t - lastMeteor > 4200 && meteors.length < 2) {
        spawnMeteor();
        lastMeteor = t;
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        const fade =
          m.life < m.maxLife * 0.15
            ? m.life / (m.maxLife * 0.15)
            : 1 - m.life / m.maxLife;
        if (m.life >= m.maxLife || m.x > width + 80 || m.x < -80) {
          meteors.splice(i, 1);
          continue;
        }
        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.vx * 14,
          m.y - m.vy * 14
        );
        grad.addColorStop(0, `rgba(240, 244, 255, ${0.9 * fade})`);
        grad.addColorStop(1, "rgba(240, 244, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
