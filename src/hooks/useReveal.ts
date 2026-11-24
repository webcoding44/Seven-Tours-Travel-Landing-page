import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "../lib/gsap";

/**
 * Scroll-triggered reveals inside a section.
 *  - [data-reveal="up|left|right|scale|fade"] (+ data-delay)
 *  - [data-stagger] -> its children animate in sequence
 *  - .split-title   -> word-by-word mask reveal (see SplitText)
 */
export function useReveal(ref: RefObject<HTMLElement | null>, extra?: () => void) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.delay || "0");
        const from: gsap.TweenVars = { opacity: 0 };
        if (type === "up") from.y = 50;
        if (type === "left") from.x = -70;
        if (type === "right") from.x = 70;
        if (type === "scale") {
          from.scale = 0.85;
          from.y = 30;
        }
        gsap.from(el, {
          ...from,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((parent) => {
        gsap.from(parent.children, {
          y: 70,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: parent, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".split-title").forEach((t) => {
        gsap.from(t.querySelectorAll(".sw-inner"), {
          yPercent: 120,
          rotate: 6,
          duration: 1.1,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: t, start: "top 88%" },
        });
      });

      extra?.();
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
