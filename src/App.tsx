import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import ScrollUI from "./components/ScrollUI";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import About from "./components/About";
import Tours from "./components/Tours";
import Services from "./components/Services";
import Journey from "./components/Journey";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import GalleryFooter from "./components/GalleryFooter";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 1500);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollUI />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <Destinations />
        <Tours />
        <About />
        <Services />
        <Journey />
        <Testimonials />
        <CTA />
        <GalleryFooter />
      </main>
    </>
  );
}
