import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "../lib/gsap";
import { services, servicesBg } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    gsap.fromTo(
      ".svc-bg",
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
    gsap.utils.toArray<HTMLElement>(".svc-orb").forEach((o, i) => {
      gsap.to(o, {
        x: i % 2 ? -60 : 60,
        y: i % 2 ? 40 : -40,
        duration: 8 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section id="services" ref={root} className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <img src={servicesBg} alt="" loading="lazy" className="svc-bg h-[125%] w-full -translate-y-[10%] object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>
      <div className="svc-orb absolute -left-20 top-20 h-80 w-80 rounded-full bg-sky/30 blur-[100px]" />
      <div className="svc-orb absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-aqua/20 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-reveal="left" className="eyebrow flex items-center gap-3 text-aqua">
              <span className="h-px w-10 bg-aqua" /> Our Services
            </div>
            <SplitText
              text="Travel Services *We Offer*"
              accent="light"
              className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
            />
            <p data-reveal className="mt-5 text-lg text-white/70">
              From planning to arrival, we take care of everything.
            </p>
          </div>
          <button data-reveal className="btn btn-ghost group w-fit">
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              onMouseMove={onMove}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-aqua/40"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--x,50%) var(--y,50%), rgba(34,211,238,0.28), transparent 65%)",
                }}
              />
              <span className="absolute right-6 top-5 font-serif text-5xl italic text-white/10 transition-colors duration-500 group-hover:text-aqua/30">
                0{i + 1}
              </span>
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-sky group-hover:to-aqua">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold">{s.title}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/65">{s.text}</p>
              <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-bold text-aqua opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
