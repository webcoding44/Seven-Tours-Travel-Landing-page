import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

export { gsap, ScrollTrigger };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  gsap.to(window, {
    scrollTo: { y: el, offsetY: 0, autoKill: true },
    duration: 1.6,
    ease: "power3.inOut",
  });
}
