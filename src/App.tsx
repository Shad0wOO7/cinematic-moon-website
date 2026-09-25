import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { destroyLenis, initLenis } from "./lib/scroll";
import Preloader from "./components/Preloader";
import StarField from "./components/StarField";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Voyage from "./components/Voyage";
import Phases from "./components/Phases";
import Histoire from "./components/Histoire";
import Stats from "./components/Stats";
import Heritage from "./components/Heritage";
import Avenir from "./components/Avenir";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = initLenis();
    lenis.stop();
    window.scrollTo(0, 0);
    return () => destroyLenis();
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const handleDone = useCallback(() => {
    setLoading(false);
    const lenis = initLenis();
    lenis.start();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-night text-moon">
      <AnimatePresence>
        {loading && <Preloader onDone={handleDone} />}
      </AnimatePresence>

      <StarField />
      <Cursor />
      <Navbar />

      <main className="relative">
        <Hero />
        <Marquee />
        <Voyage />
        <Phases />
        <Histoire />
        <Stats />
        <Heritage />
        <Avenir />
      </main>

      <Footer />

      {/* Cinematic overlays */}
      <div
        className="film-grain pointer-events-none fixed inset-0 z-[75] opacity-[0.05] mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[74]"
        aria-hidden="true"
      />
    </div>
  );
}
