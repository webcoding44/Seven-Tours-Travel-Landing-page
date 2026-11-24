import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { gsap } from "../lib/gsap";
import { destinations } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";

export default function Destinations() {
  const root = useRef<HTMLElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  useReveal(root);

  useEffect(() => {
    panels.current.forEach((p, i) => {
      if (!p) return;
      gsap.to(p, { flexGrow: i === active ? 5 : 1, duration: 1, ease: "power3.inOut", overwrite: "auto" });
      const img = p.querySelector("img");
      gsap.to(img, { scale: i === active ? 1.05 : 1.3, duration: 1.4, ease: "power3.out", overwrite: "auto" });
    });
  }, [active]);

  return (
    <section id="destinations" ref={root} className="relative overflow-hidden bg-mist py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-sky/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-aqua/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div data-reveal="left" className="eyebrow flex items-center gap-3 text-sky">
              <span className="h-px w-10 bg-sky" /> Popular Destinations
            </div>
            <SplitText
              text="Top *Destinations*"
              className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
            />
            <p data-reveal className="mt-5 max-w-lg text-lg text-slate-600">
              From bustling cities to natural wonders, explore our most loved destinations.
            </p>
          </div>
          <a
            data-reveal
            href="#tours"
            className="group inline-flex items-center gap-2 text-sm font-bold text-ocean"
          >
            View All Destinations
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean text-white transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:bg-sky">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div
          data-stagger
          className="mt-14 flex h-[760px] flex-col gap-3 sm:h-[800px] lg:h-[580px] lg:flex-row lg:gap-4"
        >
          {destinations.map((d, i) => {
            const on = active === i;
            return (
              <div
                key={d.name}
                ref={(el) => {
                  panels.current[i] = el;
                }}
                onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
                onClick={() => setActive(i)}
                data-cursor
                className="group relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-[2rem] bg-ink shadow-[0_24px_50px_-24px_rgba(4,19,43,0.6)]"
                style={{ flexGrow: i === 0 ? 5 : 1 }}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ transform: `scale(${i === 0 ? 1.05 : 1.3})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div
                  className={`absolute inset-0 bg-sky/30 mix-blend-multiply transition-opacity duration-700 ${
                    on ? "opacity-0" : "opacity-100"
                  }`}
                />

                <span className="absolute left-5 top-5 font-serif text-lg italic text-white/80">0{i + 1}</span>

                {/* collapsed label */}
                <div
                  className={`absolute inset-0 flex items-center justify-start pl-8 transition-opacity duration-500 lg:items-end lg:justify-center lg:pb-8 lg:pl-0 ${
                    on ? "opacity-0" : "opacity-100 delay-500"
                  }`}
                >
                  <span className="text-xl font-bold text-white lg:rotate-180 lg:[writing-mode:vertical-rl]">
                    {d.name}
                  </span>
                </div>

                {/* expanded content */}
                <div
                  className={`absolute bottom-0 left-0 w-full p-6 transition-all duration-700 sm:p-8 lg:w-[480px] ${
                    on
                      ? "translate-y-0 opacity-100 delay-500"
                      : "pointer-events-none translate-y-8 opacity-0"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                      <Star className="h-3 w-3 fill-sun text-sun" /> {d.rating}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                      from {d.price}
                    </span>
                  </div>
                  <h3 className="text-4xl font-extrabold text-white">{d.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-aqua">
                    <MapPin className="h-4 w-4" /> {d.country} · {d.tag}
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{d.desc}</p>
                  <button className="btn btn-primary group/b mt-5 !px-5 !py-2.5 !text-[13px]">
                    Explore {d.name}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/b:translate-x-0.5 group-hover/b:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
