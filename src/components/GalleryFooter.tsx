import { useRef } from "react";
import { ArrowRight, Globe, Mail, MapPin, Phone, Plane } from "lucide-react";
import { gsap, scrollToId } from "../lib/gsap";
import { gallery } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import SplitText from "./SplitText";

const row1 = gallery;
const row2 = [...gallery].reverse();

export default function GalleryFooter() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    const tweens: gsap.core.Tween[] = [];
    tweens.push(gsap.to(".marq-1", { xPercent: -50, duration: 55, ease: "none", repeat: -1 }));
    tweens.push(gsap.fromTo(".marq-2", { xPercent: -50 }, { xPercent: 0, duration: 65, ease: "none", repeat: -1 }));
    gsap.utils.toArray<HTMLElement>(".marq-wrap").forEach((w) => {
      w.addEventListener("mouseenter", () => tweens.forEach((t) => gsap.to(t, { timeScale: 0.15, duration: 0.6 })));
      w.addEventListener("mouseleave", () => tweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.6 })));
    });

    gsap.from(".big-letter", {
      yPercent: 110,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: { trigger: ".big-word", start: "top 95%" },
    });
  });

  const Card = ({ src, i }: { src: string; i: number }) => (
    <div
      data-cursor
      className="group relative h-52 w-64 shrink-0 overflow-hidden rounded-3xl sm:h-60 sm:w-72"
      style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
    >
      <img src={src} alt="Travel moment" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );

  return (
    <section id="gallery" ref={root} className="relative overflow-hidden bg-ink pt-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-reveal="left" className="eyebrow flex items-center gap-3 text-aqua">
              <span className="h-px w-10 bg-aqua" /> Gallery
            </div>
            <SplitText
              text="Moments Worth *Traveling* For"
              accent="light"
              className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
            />
          </div>
          <p data-reveal className="max-w-sm text-white/65">
            A glimpse of the sunsets, skylines and turquoise waters our travelers have chased with us.
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-5 py-4">
        <div className="marq-wrap overflow-hidden">
          <div className="marq-1 flex w-max gap-5 pr-5">
            {[...row1, ...row1].map((s, i) => (
              <Card key={i} src={s} i={i} />
            ))}
          </div>
        </div>
        <div className="marq-wrap overflow-hidden">
          <div className="marq-2 flex w-max gap-5 pr-5">
            {[...row2, ...row2].map((s, i) => (
              <Card key={i} src={s} i={i + 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-24 border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-aqua">
                <Plane className="h-5 w-5 rotate-[-12deg]" />
              </span>
              <span className="text-xl font-extrabold">
                The Seven <span className="font-serif font-medium italic text-aqua">Tours</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Handcrafted journeys across the USA and the world. Your dream vacation starts here.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-white/50">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {[
                ["Destinations", "destinations"],
                ["Featured Tours", "tours"],
                ["About Us", "about"],
                ["Services", "services"],
              ].map(([l, id]) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToId(id)}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-aqua"
                  >
                    <span className="h-px w-0 bg-aqua transition-all duration-300 group-hover:w-4" />
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-white/50">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-aqua" /> +1 (555) 777-0007
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-aqua" /> hello@seventours.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-aqua" /> 77 Broadway, New York, USA
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-aqua" /> Open 24/7 worldwide
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-white/50">Travel Newsletter</h4>
            <p className="mt-5 text-sm text-white/60">Exclusive deals and inspiration, once a month.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center rounded-full border border-white/15 bg-white/5 p-1.5"
            >
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/40"
              />
              <button
                aria-label="Subscribe"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky to-aqua"
              >
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="big-word mx-auto flex max-w-7xl justify-center overflow-hidden px-4 select-none">
          {"TRAVEL MORE".split("").map((c, i) => (
            <span
              key={i}
              className="big-letter outline-text-light inline-block text-[14vw] font-extrabold leading-[0.95] hover:text-aqua/30 lg:text-[11rem]"
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} The Seven Tours. All rights reserved. Crafted for dreamers & wanderers.
        </div>
      </footer>
    </section>
  );
}
