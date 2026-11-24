import { useRef } from "react";
import { gsap } from "../lib/gsap";
import { steps } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";

const PATH = "M0,100 C140,10 260,10 380,80 S600,170 720,90 S960,0 1080,70 S1160,100 1200,60";

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    gsap.fromTo(
      ".flight-draw",
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: ".flight-box", start: "top 75%", end: "bottom 45%", scrub: 1 },
      }
    );
    gsap.to(".flight-plane", {
      motionPath: { path: "#flightPath", align: "#flightPath", alignOrigin: [0.5, 0.5], autoRotate: true },
      ease: "none",
      scrollTrigger: { trigger: ".flight-box", start: "top 75%", end: "bottom 45%", scrub: 1 },
    });
    gsap.from(".step-dot", {
      scale: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(2)",
      scrollTrigger: { trigger: ".flight-box", start: "top 75%" },
    });
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div data-reveal className="eyebrow inline-flex items-center gap-3 text-sky">
            <span className="h-px w-10 bg-sky" /> How It Works <span className="h-px w-10 bg-sky" />
          </div>
          <SplitText
            text="Your Journey, *Simplified*"
            className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl"
          />
        </div>

        <div className="flight-box relative mt-16">
          {/* Desktop flight path */}
          <svg viewBox="0 0 1200 180" className="hidden h-auto w-full overflow-visible lg:block" fill="none">
            <path d={PATH} stroke="#9bb8e6" strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />
            <path
              id="flightPath"
              className="flight-draw"
              d={PATH}
              stroke="url(#flightGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
            <defs>
              <linearGradient id="flightGrad" x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="1" stopColor="#1e90ff" />
              </linearGradient>
            </defs>
            <g className="flight-plane">
              <g transform="scale(1.5)">
                <path
                  d="M18 0 L-14 -13 L-8 0 L-14 13 Z"
                  fill="#fff"
                  stroke="#1e90ff"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path d="M18 0 L-8 0" stroke="#1e90ff" strokeWidth="2" />
              </g>
            </g>
          </svg>

          <div data-stagger className="relative grid gap-6 sm:grid-cols-2 lg:-mt-6 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-[1.75rem] border border-white bg-white p-7 shadow-[0_20px_50px_-30px_rgba(10,58,138,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(30,144,255,0.6)]"
              >
                <span className="step-dot absolute -top-4 left-7 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky to-aqua text-sm font-extrabold text-white shadow-lg">
                  {i + 1}
                </span>
                <span className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-ocean transition-all duration-500 group-hover:bg-ocean group-hover:text-white">
                  <s.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
