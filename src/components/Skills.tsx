"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, type Lang } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Skills({ lang }: { lang: Lang }) {
  const t = content[lang].skills;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".skills-label", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".skills-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={t.id}
      className="relative z-10 py-32 sm:py-44"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex items-center gap-6">
          <p className="skills-label font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {t.label}
          </p>
          <span className="skills-rule h-px flex-1 bg-white/15" />
        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.groups.map((group) => (
            <div key={group.category} className="skill-row border-t border-white/10 pt-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                {group.category}
              </h3>
              <ul lang="en" className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-neutral-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
