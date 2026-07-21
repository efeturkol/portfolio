"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, type Lang } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function About({ lang }: { lang: Lang }) {
  const t = content[lang].about;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Sahne açılışı: etiket + çizgi
      gsap.from(".about-label", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".about-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      // Büyük metin satır satır perdeden çıkar
      gsap.from(".about-line", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".about-statement", start: "top 78%" },
      });

      gsap.from(".about-body", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-body", start: "top 85%" },
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={t.id}
      className="relative z-10 overflow-hidden py-32 sm:py-44"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 flex items-center gap-6">
          <p className="about-label font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {t.label}
          </p>
          <span className="about-rule h-px flex-1 bg-white/15" />
        </div>

        <h2 className="about-statement text-[clamp(1.7rem,5.5vw,4.2rem)] font-semibold leading-[1.18] tracking-tight text-white">
          {t.lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="about-line block">{line}</span>
            </span>
          ))}
        </h2>

        <div className="mt-20">
          <p className="about-body max-w-2xl leading-relaxed text-neutral-400">
            {t.body}
          </p>
        </div>
      </div>
    </section>
  );
}
