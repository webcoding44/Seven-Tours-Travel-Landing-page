import { useRef } from "react";
import { ArrowRight, Plane, Star } from "lucide-react";
import { gsap } from "../lib/gsap";
import { aboutFeatures, aboutImg, stats } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    // image mask reveal + parallax
    gsap.fromTo(
      ".about-img-wrap",
      { clipPath: "inset(0% 0% 100% 0% round 2.5rem)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
        duration: 1.6,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-img-wrap", start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".about-img",
      { yPercent: -10, scale: 1.25 },
      {
        yPercent: 10,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: ".about-img-wrap", start: "top bottom", end: "bottom top", scrub: true },
      }
    );
    gsap.from(".about-badge", {
      scale: 0,
      rotate: -90,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: ".about-badge", start: "top 90%" },
    });
    gsap.from(".about-card", {
      x: 60,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".about-card", start: "top 92%" },
    });
    gsap.to(".blob-a", {
      yPercent: -40,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });

    // counters
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      const o = { v: 0 };
      gsap.to(o, {
        v: target,
        duration: 2.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
        onUpdate: () => {
          el.textContent = o.v.toLocaleString("en-US", {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
          });
        },
      });
    });
  });

  return (
    <section id="about" ref={root} className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="blob-a pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-10">
        {/* Image side */}
        <div className="relative">
          <div className="about-img-wrap relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-30px_rgba(10,58,138,0.55)]">
            <img src={aboutImg} alt="Traveler exploring Santorini" className="about-img h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>

          <div className="about-badge absolute -right-4 -top-8 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl sm:-right-8 sm:h-36 sm:w-36">
            <svg viewBox="0 0 120 120" className="absolute inset-0 animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text fontSize="10.5" fontWeight="700" letterSpacing="2.6" fill="#0a3a8a">
                <textPath href="#circ">EXPLORE • DREAM • DISCOVER •</textPath>
              </text>
            </svg>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky to-aqua text-white">
              <Plane className="h-5 w-5 rotate-45" />
            </span>
          </div>

          <div className="about-card float-y absolute -bottom-8 -left-4 flex items-center gap-4 rounded-3xl border border-white/60 bg-white/90 p-4 pr-6 shadow-2xl backdrop-blur sm:-left-10">
            <div className="flex -space-x-3">
              {["from-sky to-aqua", "from-sun to-pink-400", "from-ocean to-sky"].map((g, i) => (
                <span
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${g} text-xs font-bold text-white`}
                >
                  {["S", "J", "E"][i]}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm font-extrabold text-ink">
                4.9 <Star className="h-3.5 w-3.5 fill-sun text-sun" />
              </div>
              <div className="text-xs text-slate-500">Loved by 12k+ travelers</div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <div data-reveal="left" className="eyebrow flex items-center gap-3 text-sky">
            <span className="h-px w-10 bg-sky" /> About The Seven Tours
          </div>
          <SplitText
            text="More Than Just a Trip, It's a *Lifetime Experience*"
            className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          />
          <p data-reveal className="mt-6 text-lg leading-relaxed text-slate-600">
            At The Seven Tours, we believe travel is not just about visiting new places — it's about creating memories,
            experiencing different cultures, and discovering the world in your own way. We specialize in customized
            tours, group trips, and luxury travel experiences across the USA and international destinations.
          </p>

          <div data-stagger className="mt-9 grid gap-4 sm:grid-cols-2">
            {aboutFeatures.map((f) => (
              <div
                key={f.title}
                className="group flex gap-4 rounded-3xl border border-slate-100 bg-mist/60 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-sky/30 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(30,144,255,0.6)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-ocean shadow-sm transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky group-hover:to-aqua group-hover:text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-slate-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-9">
            <Magnetic>
              <button className="btn btn-primary group">
                Learn More About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto mt-24 max-w-7xl px-6 lg:px-10">
        <div
          data-stagger
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky/30 via-aqua/30 to-sky/30 p-px lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden bg-gradient-to-br from-ink to-ocean px-6 py-9 text-center text-white first:rounded-tl-[2rem] last:rounded-br-[2rem] lg:first:rounded-bl-[2rem] lg:last:rounded-tr-[2rem]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-aqua/10 blur-2xl transition-transform duration-700 group-hover:scale-[2.5]" />
              <div className="relative text-4xl font-extrabold tabular-nums sm:text-5xl">
                <span data-count={s.value} data-dec={s.decimals}>
                  0
                </span>
                <span className="font-serif italic text-aqua">{s.suffix}</span>
              </div>
              <div className="relative mt-2 text-sm font-medium text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
