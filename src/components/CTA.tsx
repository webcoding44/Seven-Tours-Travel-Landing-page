import { useRef, useState } from "react";
import { Check, Plane, Send } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ctaBg } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";

const wave = (() => {
  let d = "M0,60";
  for (let i = 0; i < 4; i++) {
    const o = i * 600;
    d += ` C${o + 100},20 ${o + 200},20 ${o + 300},60 S${o + 500},100 ${o + 600},60`;
  }
  return `${d} V120 H0 Z`;
})();

export default function CTA() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  useReveal(root, () => {
    gsap.fromTo(
      ".cta-bg",
      { yPercent: -10, scale: 1.15 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
    gsap.to(".wave-a", { xPercent: -50, duration: 14, repeat: -1, ease: "none" });
    gsap.fromTo(".wave-b", { xPercent: -50 }, { xPercent: 0, duration: 20, repeat: -1, ease: "none" });
    gsap.fromTo(
      ".cta-plane",
      { x: "-15vw", y: 40, rotate: -6 },
      { x: "115vw", y: -60, rotate: -12, duration: 14, repeat: -1, ease: "none" }
    );
    gsap.to(".cta-hut", { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.4 });
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    gsap.fromTo(".cta-ok", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2.5)" });
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ink py-28 text-white lg:py-36">
      <div className="absolute inset-0 overflow-hidden">
        <img src={ctaBg} alt="" loading="lazy" className="cta-bg h-[125%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ocean/55 to-ink/90" />
      </div>

      <div className="cta-plane pointer-events-none absolute left-0 top-[18%]">
        <div className="relative flex items-center">
          <div className="absolute right-full mr-1 h-[2px] w-48 bg-gradient-to-l from-white/70 to-transparent" />
          <Plane className="h-10 w-10 rotate-45 fill-white text-white" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div data-reveal className="eyebrow text-aqua">
          Ready for your next adventure?
        </div>
        <SplitText
          text="Let's Plan Your Dream Trip *Today!*"
          accent="light"
          className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        />
        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          Get in touch with our travel experts and start exploring the world.
        </p>

        <div data-reveal="scale" className="mx-auto mt-10 max-w-xl">
          {sent ? (
            <div className="cta-ok flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/15 px-6 py-5 font-semibold backdrop-blur-xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-aqua text-ink">
                <Check className="h-5 w-5" />
              </span>
              Thank you! A travel expert will contact you shortly.
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="flex flex-col gap-3 rounded-[2rem] border border-white/25 bg-white/15 p-2 shadow-2xl backdrop-blur-xl sm:flex-row sm:rounded-full"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-full bg-transparent px-6 py-3.5 text-white outline-none placeholder:text-white/60"
              />
              <Magnetic strength={0.2}>
                <button type="submit" className="btn btn-primary group w-full">
                  Plan Your Trip
                  <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>

      {/* Waves */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">
        <svg className="wave-b absolute bottom-0 left-0 h-full w-[200%] opacity-40" viewBox="0 0 2400 120" preserveAspectRatio="none">
          <path d={wave} fill="#0a3a8a" />
        </svg>
        <svg className="wave-a absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2400 120" preserveAspectRatio="none">
          <path d={wave} fill="#04132b" />
        </svg>
      </div>
    </section>
  );
}
