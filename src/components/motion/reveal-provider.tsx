"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A single IntersectionObserver drives every scroll reveal on the site, rather
 * than one observer per element. Elements opt in with `data-reveal`; the
 * observer flips the attribute to "in". Re-runs on route change so newly
 * mounted pages animate too. Respects reduced-motion via CSS.
 */
export function RevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced) {
      targets.forEach((el) => el.setAttribute("data-reveal", "in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-reveal", "in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => {
      if (el.getAttribute("data-reveal") !== "in") observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
