import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Clock, Heart, MapPin, Star } from "lucide-react";
import { gsap } from "../lib/gsap";
import { tours } from "../lib/data";
import SplitText from "./SplitText";

export default function Tours() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // header reveal (both layouts)
    const ctxHead = gsap.context(() => {
      gsap.from(".tours-head > *", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".split-title .sw-inner", {
        yPercent: 120,
        rotate: 6,
        duration: 1.1,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);

    mm.add("(min-width: 1024px)", () => {
      const el = track.current!;
      const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
      gsap.to(el, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(bar.current, { scaleX: self.progress });
          },
        },
      });
      gsap.to(".tours-bg-word", {
        x: () => -dist() * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          scrub: true,
          start: "top top",
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      mm.revert();
      ctxHead.revert();
    };
  }, []);

  // 3D tilt on cards
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotationY: px * 10,
      rotationX: -py * 10,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
  };

  return (
    <section
      id="tours"
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-mist py-20 lg:flex lg:h-screen lg:min-h-[720px] lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="tours-bg-word outline-text pointer-events-none absolute left-[5vw] top-24 select-none whitespace-nowrap text-[18vw] font-extrabold leading-none lg:top-1/2 lg:-translate-y-1/2">
        ADVENTURE
      </div>

      <div className="tours-head relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <div className="eyebrow flex items-center gap-3 text-sky">
            <span className="h-px w-10 bg-sky" /> Featured Tours
          </div>
          <SplitText
            text="Handcrafted *Journeys*"
            className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          />
        </div>
        <div className="w-full max-w-xs">
          <p className="mb-3 hidden text-sm text-slate-500 lg:block">Keep scrolling to explore →</p>
          <div className="hidden h-[3px] overflow-hidden rounded bg-slate-200 lg:block">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-sky to-aqua" />
          </div>
          <p className="text-sm text-slate-500 lg:hidden">Swipe to explore →</p>
        </div>
      </div>

      <div className="no-scrollbar relative mt-10 overflow-x-auto lg:overflow-visible">
        <div ref={track} className="flex w-max gap-6 px-6 pb-10 lg:gap-8 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pb-0 lg:pr-[10vw]">
          {tours.map((t, i) => (
            <div
              key={t.name}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              data-cursor
              className="group relative h-[460px] w-[82vw] shrink-0 overflow-hidden rounded-[2rem] bg-ink shadow-[0_30px_60px_-28px_rgba(4,19,43,0.7)] sm:w-[380px] lg:h-[52vh] lg:max-h-[520px] lg:min-h-[420px] lg:w-[400px]"
            >
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-ocean backdrop-blur">
                  {t.tag}
                </span>
                <button
                  aria-label="Save"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white hover:text-rose-500"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <span className="absolute right-5 top-20 font-serif text-6xl italic text-white/20">0{i + 1}</span>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-aqua">
                  <MapPin className="h-4 w-4" /> {t.place}
                </div>
                <h3 className="mt-1 text-3xl font-extrabold leading-tight">{t.name}</h3>
                <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {t.days} days
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-sun text-sun" /> {t.rating}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/60">From</div>
                    <div className="text-2xl font-extrabold">{t.price}</div>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ocean transition-all duration-500 group-hover:rotate-45 group-hover:bg-aqua group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
