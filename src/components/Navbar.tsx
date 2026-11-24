import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Plane, Search, X } from "lucide-react";
import { gsap, ScrollTrigger, scrollToId } from "../lib/gsap";
import Magnetic from "./Magnetic";

const links = [
  { id: "home", label: "Home" },
  { id: "destinations", label: "Destinations" },
  { id: "tours", label: "Tours" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "gallery", label: "Gallery" },
];

const currencies = [
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "GBP", flag: "🇬🇧" },
  { code: "AED", flag: "🇦🇪" },
];

export default function Navbar({ ready }: { ready: boolean }) {
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const [curOpen, setCurOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  // initial hide until loader finishes
  useEffect(() => {
    gsap.set(nav.current, { yPercent: -120, opacity: 0 });
  }, []);

  useEffect(() => {
    if (!ready) return;
    gsap.to(nav.current, { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.2 });
  }, [ready]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(l.id),
        })
      );
    });
    const main = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScrolled(self.scroll() > 60);
        if (openRef.current) return;
        const hide = self.direction === 1 && self.scroll() > 500;
        gsap.to(nav.current, { yPercent: hide ? -120 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      },
    });
    return () => {
      triggers.forEach((t) => t.kill());
      main.kill();
    };
  }, []);

  useEffect(() => {
    const m = menu.current!;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.to(m, { clipPath: "circle(150% at 92% 4%)", duration: 0.9, ease: "power4.inOut" });
      gsap.fromTo(
        ".m-link",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.8, ease: "power3.out", delay: 0.35 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(m, { clipPath: "circle(0% at 92% 4%)", duration: 0.7, ease: "power4.inOut" });
    }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 400 : 0);
  };

  return (
    <>
      <header
        ref={nav}
        className={`fixed inset-x-0 top-0 z-[80] transition-[background,backdrop-filter,box-shadow,padding] duration-500 ${
          scrolled
            ? "bg-ink/75 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "bg-gradient-to-b from-ink/60 to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 text-white lg:px-10">
          <button onClick={() => go("home")} className="flex items-center gap-2.5" aria-label="The Seven Tours">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-aqua shadow-[0_8px_20px_-6px_rgba(34,211,238,0.8)]">
              <Plane className="h-5 w-5 rotate-[-12deg]" />
            </span>
            <span className="hidden text-lg font-extrabold leading-none tracking-tight sm:block">
              The Seven <span className="font-serif font-medium italic text-aqua">Tours</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`group relative px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                  active === l.id ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded bg-aqua transition-transform duration-500 ${
                    active === l.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur"
              >
                <span className="text-sm">{currencies[cur].flag}</span>
                {currencies[cur].code}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${curOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute right-0 top-full mt-2 w-32 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-ink/95 p-1 text-xs font-semibold shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                  curOpen ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
                }`}
              >
                {currencies.map((c, i) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCur(i);
                      setCurOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {c.flag} {c.code}
                  </button>
                ))}
              </div>
            </div>
            <button
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white sm:flex"
            >
              <Search className="h-4 w-4" />
            </button>
            <div className="hidden md:block">
              <Magnetic strength={0.25}>
                <button onClick={() => go("contact")} className="btn btn-primary !px-5 !py-2.5 !text-[13px]">
                  Plan Your Trip
                </button>
              </Magnetic>
            </div>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={menu}
        style={{ clipPath: "circle(0% at 92% 4%)" }}
        className={`fixed inset-0 z-[95] flex flex-col justify-center bg-ink px-8 text-white ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(30,144,255,0.35),transparent_55%)]" />
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-6 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25"
        >
          <X className="h-5 w-5" />
        </button>
        <nav className="relative flex flex-col gap-2">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="m-link flex items-baseline gap-4 py-1 text-left text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              <span className="font-serif text-base italic text-aqua">0{i + 1}</span>
              {l.label}
            </button>
          ))}
        </nav>
        <button onClick={() => go("contact")} className="m-link btn btn-primary relative mt-10 self-start">
          Plan Your Trip
        </button>
      </div>
    </>
  );
}
