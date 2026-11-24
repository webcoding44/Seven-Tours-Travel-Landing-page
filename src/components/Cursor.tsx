import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    document.documentElement.classList.add("has-cursor");
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      gsap.set(d, { x: e.clientX, y: e.clientY, opacity: 1 });
      gsap.to(r, { opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hot = !!t.closest("a, button, input, [data-cursor]");
      gsap.to(r, {
        scale: hot ? 1.9 : 1,
        backgroundColor: hot ? "rgba(34,211,238,0.25)" : "rgba(34,211,238,0)",
        duration: 0.35,
        overwrite: "auto",
      });
      gsap.to(d, { scale: hot ? 0.4 : 1, duration: 0.3, overwrite: "auto" });
    };
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-10 w-10 rounded-full border border-aqua/80 mix-blend-normal"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-aqua shadow-[0_0_12px_#22d3ee]"
      />
    </>
  );
}
