import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setGone(true);
          ScrollTrigger.refresh();
        },
      });
      tl.from(".ld-in", { y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" })
        .to(
          obj,
          {
            v: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(obj.v));
              if (bar.current) gsap.set(bar.current, { scaleX: obj.v / 100 });
              if (plane.current) gsap.set(plane.current, { left: `${obj.v}%` });
            },
          },
          0.3
        )
        .to(".ld-in", { y: -30, opacity: 0, stagger: 0.06, duration: 0.5, ease: "power2.in" }, ">0.1")
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, ">-0.1")
        .add(() => onDone(), "<0.45");
    }, root);
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(30,144,255,0.25),transparent_60%)]" />
      <div className="ld-in relative mb-3 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-aqua">
          <Plane className="h-6 w-6 rotate-[-10deg]" />
        </span>
        <span className="text-3xl font-extrabold tracking-tight">
          The Seven <span className="font-serif font-medium italic text-aqua">Tours</span>
        </span>
      </div>
      <p className="ld-in eyebrow relative mb-14 text-white/60">Preparing your journey</p>

      <div className="ld-in relative w-[min(78vw,420px)]">
        <div className="h-[3px] w-full rounded bg-white/15">
          <div ref={bar} className="h-full origin-left scale-x-0 rounded bg-gradient-to-r from-sky to-aqua" />
        </div>
        <div ref={plane} className="absolute -top-[13px] left-0 -translate-x-1/2">
          <Plane className="h-7 w-7 rotate-45 text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
        </div>
      </div>
      <div className="ld-in relative mt-8 font-serif text-6xl font-medium italic tabular-nums text-white/90">
        <span ref={count}>0</span>
        <span className="text-2xl text-aqua">%</span>
      </div>
    </div>
  );
}
