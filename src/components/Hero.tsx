import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Play, Plane } from "lucide-react";
import { gsap, scrollToId } from "../lib/gsap";
import { heroSlides, trustItems } from "../lib/data";
import Magnetic from "./Magnetic";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const prevIdx = useRef(0);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const [idx, setIdx] = useState(0);

  // Intro timeline (built hidden, played when loader finishes) + ambient motion
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      tl.from(".hero-eyebrow", { x: -40, opacity: 0, duration: 1 })
        .from(".h-line", { yPercent: 120, rotate: 4, duration: 1.4, stagger: 0.16 }, "<0.1")
        .from(".hero-chip", { y: 20, opacity: 0, duration: 0.9 }, "<0.5")
        .from(".hero-p", { y: 30, opacity: 0, duration: 1 }, "<0.1")
        .from(".hero-cta > *", { y: 30, opacity: 0, stagger: 0.12, duration: 0.9 }, "<0.15")
        .from(".switcher", { x: 90, opacity: 0, duration: 1.2 }, "<0.1")
        .from(".strip-item", { y: 50, opacity: 0, stagger: 0.08, duration: 0.9 }, "<0.1");
      intro.current = tl;

      // clouds drifting
      gsap.utils.toArray<HTMLElement>(".cloud").forEach((c, i) => {
        gsap.to(c, {
          x: i % 2 ? -120 : 140,
          y: i % 2 ? 20 : -20,
          duration: 14 + i * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // plane flight loop with trail
      const fly = gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 3.5 });
      fly
        .fromTo(
          ".hero-plane",
          { x: "-20vw", y: "32vh", rotate: -4 },
          { x: "120vw", y: "6vh", rotate: -14, duration: 11, ease: "sine.inOut" }
        )
        .fromTo(".hero-plane", { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0)
        .to(".hero-plane", { opacity: 0, duration: 1.2 }, "-=1.2");

      // parallax on scroll
      gsap.to(".hero-content", {
        yPercent: 18,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-slides", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  // Slide transitions
  useEffect(() => {
    const prev = prevIdx.current;
    prevIdx.current = idx;
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === idx) {
        gsap.set(el, { zIndex: 2 });
        gsap.to(el, { opacity: 1, duration: prev === idx ? 0.01 : 1.6, ease: "power2.inOut", overwrite: "auto" });
        gsap.fromTo(el, { scale: 1.22 }, { scale: 1.02, duration: 9, ease: "power1.out" });
      } else if (i === prev) {
        gsap.set(el, { zIndex: 1 });
        gsap.to(el, { opacity: 0, duration: 1.6, delay: 0.3, ease: "power2.inOut", overwrite: "auto" });
      } else {
        gsap.set(el, { opacity: 0, zIndex: 0 });
      }
    });
    if (root.current) {
      gsap.fromTo(
        root.current.querySelectorAll(".slide-info"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: prev === idx ? 0 : 0.4 }
      );
    }
  }, [idx]);

  // Auto-advance driven by the progress bar
  useEffect(() => {
    if (!ready) return;
    const t = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 7,
        ease: "none",
        onComplete: () => setIdx((i) => (i + 1) % heroSlides.length),
      }
    );
    return () => {
      t.kill();
    };
  }, [idx, ready]);

  const s = heroSlides[idx];

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
    >
      {/* Background slides */}
      <div className="hero-slides absolute inset-0 -top-10 bottom-0">
        {heroSlides.map((sl, i) => (
          <div
            key={sl.place}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0 opacity-0 will-change-transform"
          >
            <img src={sl.img} alt={sl.place} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />

      {/* Ambient layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="cloud absolute -left-20 top-[18%] h-24 w-[420px] rounded-full bg-white/15 blur-3xl" />
        <div className="cloud absolute right-[8%] top-[34%] h-20 w-[360px] rounded-full bg-sky/20 blur-3xl" />
        <div className="cloud absolute left-[30%] top-[8%] h-16 w-[300px] rounded-full bg-sun/15 blur-3xl" />
        <div className="hero-plane absolute left-0 top-0 opacity-0">
          <div className="relative flex items-center">
            <div className="absolute right-full mr-1 h-[2px] w-56 bg-gradient-to-l from-white/80 to-transparent" />
            <Plane className="h-12 w-12 rotate-45 fill-white/90 text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-16 pt-36 lg:px-10">
        <div className="hero-eyebrow eyebrow flex items-center gap-3 text-white/85">
          <span className="h-px w-12 bg-aqua" />
          Your Dream Vacation Awaits
        </div>

        <h1 className="mt-6 text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.6rem]">
          <span className="block overflow-hidden pb-2">
            <span className="h-line block">Explore the World</span>
          </span>
          <span className="block overflow-hidden pb-3">
            <span className="h-line block">
              With <span className="text-shimmer">The Seven Tours</span>
            </span>
          </span>
        </h1>

        <div className="hero-chip mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur lg:hidden">
          <MapPin className="h-4 w-4 text-aqua" />
          <span className="slide-info">
            {s.place}, {s.country}
          </span>
        </div>

        <p className="hero-p mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Discover breathtaking destinations, unforgettable experiences, and expertly crafted tours across the USA and
          beyond.
        </p>

        <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button onClick={() => scrollToId("tours")} className="btn btn-primary group">
              <Plane className="h-4 w-4" />
              Explore Tours
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={() => scrollToId("about")} className="btn btn-ghost group">
              <span className="pulse-ring relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-ocean">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              Watch Our Story
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Destination switcher */}
      <div className="switcher absolute bottom-40 right-10 z-10 hidden w-[330px] rounded-[1.75rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
          <span>Now showing</span>
          <span className="tabular-nums">
            0{idx + 1} / 0{heroSlides.length}
          </span>
        </div>
        <div className="slide-info mt-3 font-serif text-4xl font-medium italic leading-none">{s.place}</div>
        <div className="slide-info mt-2 flex items-center gap-1.5 text-sm text-white/75">
          <MapPin className="h-3.5 w-3.5 text-aqua" />
          {s.tag}
        </div>
        <div className="mt-5 flex gap-2.5">
          {heroSlides.map((sl, i) => (
            <button
              key={sl.place}
              onClick={() => setIdx(i)}
              aria-label={sl.place}
              className={`h-14 flex-1 overflow-hidden rounded-xl ring-2 transition-all duration-500 ${
                i === idx ? "ring-aqua" : "opacity-60 ring-transparent hover:opacity-100"
              }`}
            >
              <img src={sl.img.replace("w=2000", "w=300")} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-4 h-[3px] overflow-hidden rounded bg-white/20">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-aqua to-sky" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 border-t border-white/15 bg-ink/65 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-6 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
          {trustItems.map((t, i) => (
            <div
              key={t.title}
              className={`strip-item group flex items-center gap-3.5 ${
                i > 0 ? "lg:border-l lg:border-white/15 lg:pl-6" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-aqua group-hover:bg-aqua/20">
                <t.icon className="h-5 w-5 text-white" />
              </span>
              <div className="text-[13px] font-semibold leading-tight text-white/90">
                {t.title}
                <br />
                {t.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
