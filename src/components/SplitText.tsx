import type { ElementType } from "react";

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
  accent?: "light" | "dark";
}

/** Words wrapped in *asterisks* get the serif-italic gradient accent. */
export default function SplitText({ text, className = "", as: Tag = "h2", accent = "dark" }: Props) {
  return (
    <Tag className={`split-title ${className}`} aria-label={text.replace(/\*/g, "")}>
      {text.split(" ").map((w, i) => {
        const isAccent = w.startsWith("*") || w.includes("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} className="mr-[0.26em] inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom">
            <span
              aria-hidden
              className={`sw-inner inline-block will-change-transform ${
                isAccent
                  ? `font-serif italic font-medium ${accent === "light" ? "text-shimmer" : "text-shimmer-dark"} pr-[0.08em]`
                  : ""
              }`}
            >
              {clean}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
