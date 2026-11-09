import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Section shell                                                       */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  className = "",
  id,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {bleed ? children : <div className="container-cea">{children}</div>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  aside,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        aside ? "lg:flex-row lg:items-end lg:justify-between" : ""
      } ${align === "center" ? "items-center text-center" : ""} ${className}`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow && (
          <div
            className={`mb-4 flex items-center gap-2.5 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" />
            <span className="label-mono text-cyan/90">{eyebrow}</span>
          </div>
        )}
        <h2 className="display-lg text-ink">{title}</h2>
        {lede && (
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            {lede}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "violet";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
};

const sizes = {
  sm: "px-4 py-2 text-[0.8125rem]",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-[0.9375rem]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon = false,
  onClick,
  type = "button",
  disabled,
  external,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold transition-all duration-300 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-cyan text-void shadow-[0_0_0_0_rgba(0,217,255,0)] hover:shadow-[0_8px_40px_-8px_rgba(0,217,255,0.6)] hover:brightness-110",
    secondary:
      "border border-white/12 bg-white/[0.03] text-ink backdrop-blur-sm hover:border-cyan/40 hover:bg-white/[0.06]",
    ghost: "text-muted hover:text-ink",
    violet:
      "bg-violet text-white shadow-[0_8px_40px_-12px_rgba(136,92,255,0.8)] hover:brightness-110",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </>
  );

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Badges & tags                                                       */
/* ------------------------------------------------------------------ */

export function Pill({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "cyan" | "green" | "violet";
  className?: string;
}) {
  const tones = {
    neutral: "border-white/10 text-muted",
    cyan: "border-cyan/30 bg-cyan/[0.07] text-cyan",
    green: "border-green/30 bg-green/[0.07] text-green",
    violet: "border-violet/30 bg-violet/[0.09] text-violet-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function LiveDot({ tone = "green" }: { tone?: "green" | "cyan" | "violet" }) {
  const map = { green: "bg-green", cyan: "bg-cyan", violet: "bg-violet" };
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${map[tone]} opacity-70`} />
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${map[tone]}`} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className = "",
  glow = false,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  as?: "div" | "article" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      {...rest}
      className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-all duration-500 hover:border-white/[0.16] hover:from-white/[0.06] ${
        glow ? "glow-edge" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stat                                                                */
/* ------------------------------------------------------------------ */

export function Stat({
  value,
  label,
  suffix = "",
}: {
  value: string | number;
  label: string;
  suffix?: string;
}) {
  return (
    <div>
      <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {value}
        <span className="text-cyan">{suffix}</span>
      </p>
      <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Divider / glow orbs                                                 */
/* ------------------------------------------------------------------ */

export function GlowOrb({
  className = "",
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "green" | "violet";
}) {
  const map = {
    cyan: "bg-cyan/[0.12]",
    green: "bg-green/[0.09]",
    violet: "bg-violet/[0.13]",
  };
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[120px] ${map[color]} ${className}`}
    />
  );
}

export function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-white/[0.06] py-4">
      <div className="animate-marquee flex min-w-max items-center gap-10">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted/70"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-cyan/50" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
