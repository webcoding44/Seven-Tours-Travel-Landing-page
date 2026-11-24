import { useEffect, useRef, useState } from "react";
import { ArrowRight, Quote, Star } from "lucide-react";
import { gsap } from "../lib/gsap";
import { reviews } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useReveal(root);

  useEffect(() => {
    if (!root.current) return;
    const q = root.current;
    gsap.fromTo(
      q.querySelectorAll(".rv-w"),
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.022, duration: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(
      q.querySelectorAll(".rv-star"),
      { scale: 0, rotate: -90 },
      { scale: 1, rotate: 0, stagger: 0.08, duration: 0.6, ease: "back.out(3)" }
    );
    gsap.fromTo(
      q.querySelectorAll(".rv-author"),
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
    const t = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 6.5,
        ease: "none",
        onComplete: () => setActive((a) => (a + 1) % reviews.length),
      }
    );
    return () => {
      t.kill();
    };
  }, [active]);

  const r = reviews[active];

  return (
    <section id="reviews" ref={root} className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-sky/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-reveal="left" className="eyebrow flex items-center gap-3 text-sky">
              <span className="h-px w-10 bg-sky" /> Testimonials
            </div>
            <SplitText
              text="What Our *Travelers* Say"
              className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
            />
          </div>
          <a data-reveal href="#reviews" className="group inline-flex items-center gap-2 text-sm font-bold text-ocean">
            See More Reviews
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Active review */}
          <div
            data-reveal="scale"
            className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-ink via-[#08275e] to-ocean p-8 text-white shadow-[0_40px_80px_-35px_rgba(10,58,138,0.8)] sm:p-12"
          >
            <Quote className="absolute right-8 top-8 h-28 w-28 rotate-180 text-white/[0.07]" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-aqua/20 blur-3xl" />
            <div className="relative flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="rv-star h-5 w-5 fill-sun text-sun" />
              ))}
            </div>
            <p className="relative mt-6 min-h-[170px] font-serif text-2xl leading-snug sm:min-h-[150px] sm:text-[1.9rem]">
              “
              {r.text.split(" ").map((w, i) => (
                <span key={`${active}-${i}`} className="rv-w inline-block">
                  {w}&nbsp;
                </span>
              ))}
              ”
            </p>
            <div className="rv-author relative mt-8 flex items-center gap-4">
              <img
                src={r.img}
                alt={r.name}
                className="h-16 w-16 rounded-full border-2 border-aqua object-cover"
              />
              <div>
                <div className="text-lg font-bold">{r.name}</div>
                <div className="text-sm text-white/70">
                  {r.flag} {r.loc} · <span className="text-aqua">{r.trip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selector list */}
          <div data-stagger className="flex flex-col gap-4">
            {reviews.map((rv, i) => {
              const on = i === active;
              return (
                <button
                  key={rv.name}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-500 ${
                    on
                      ? "border-sky/40 bg-mist shadow-[0_20px_40px_-24px_rgba(30,144,255,0.7)]"
                      : "border-slate-100 bg-white hover:-translate-y-1 hover:border-sky/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={rv.img} alt="" className="h-14 w-14 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-ink">{rv.name}</div>
                      <div className="truncate text-sm text-slate-500">
                        {rv.flag} {rv.loc}
                      </div>
                      <div className="mt-1 flex gap-0.5">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} className="h-3 w-3 fill-sun text-sun" />
                        ))}
                      </div>
                    </div>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ${
                        on ? "bg-sky text-white" : "bg-mist text-ocean group-hover:bg-sky group-hover:text-white"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  {on && (
                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-sky/15">
                      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-sky to-aqua" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
