import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "../lib/gsap";

export default function ScrollUI() {
  const bar = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(top.current, { scale: 0, opacity: 0 });
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3, invalidateOnRefresh: true },
      });
      let shown = false;
      const onScroll = () => {
        const s = window.scrollY > 900;
        if (s !== shown) {
          shown = s;
          gsap.to(top.current, {
            scale: s ? 1 : 0,
            opacity: s ? 1 : 0,
            duration: 0.5,
            ease: s ? "back.out(2)" : "power2.in",
          });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[90] h-[3px] w-full">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-aqua via-sky to-sun" />
      </div>
      <button
        ref={top}
        aria-label="Back to top"
        onClick={() => gsap.to(window, { scrollTo: 0, duration: 1.8, ease: "power3.inOut" })}
        className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky to-ocean text-white shadow-[0_12px_30px_-6px_rgba(30,144,255,0.8)]"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
