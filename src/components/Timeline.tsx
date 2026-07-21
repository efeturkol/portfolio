"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, type Lang } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ lang }: { lang: Lang }) {
  const t = content[lang].timeline;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".timeline-label", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".timeline-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      // Dikey çizgi kaydırmayla birlikte çizilir
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-list",
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          x: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id={t.id} className="relative z-10 py-32 sm:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex items-center gap-6">
          <p className="timeline-label font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {t.label}
          </p>
          <span className="timeline-rule h-px flex-1 bg-white/15" />
        </div>

        <div className="timeline-list relative max-w-2xl pl-10 sm:pl-14">
          <span aria-hidden className="absolute bottom-2 left-1.5 top-2 w-px bg-white/10" />
          <span
            aria-hidden
            className="timeline-line absolute bottom-2 left-1.5 top-2 w-px bg-gold/70"
          />

          <ol className="space-y-14">
            {t.entries.map((entry) => (
              <li key={entry.title} className="timeline-item relative">
                <span
                  aria-hidden
                  className="absolute -left-[38px] top-1 h-2.5 w-2.5 rounded-full border border-gold bg-[#0a0a0a] sm:-left-[54px]"
                />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  {entry.year}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
                  {entry.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
