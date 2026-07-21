"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, type Lang } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Stats({ lang }: { lang: Lang }) {
  const stats = content[lang].stats;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((item, i) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative z-10 border-y border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-item flex flex-col items-center gap-2 border-white/10 px-4 py-10 text-center sm:py-14 ${
              i > 0 ? "border-l" : ""
            }`}
          >
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {/* Animasyon çalışmazsa hedef değer görünür kalır */}
              <span className="stat-value tabular-nums" data-target={stat.value}>
                {stat.value}
              </span>
              <span className="text-gold">+</span>
            </p>
            <p
              lang={stat.lang}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 sm:text-xs"
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
