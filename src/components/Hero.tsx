"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import { content, type Lang } from "@/lib/content";

function LetterLine({ text }: { text: string }) {
  return (
    <span className="block overflow-hidden">
      <span className="block">
        {text.split("").map((ch, i) => (
          <span key={i} className="hero-letter inline-block will-change-transform">
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero({ lang }: { lang: Lang }) {
  const t = content[lang].hero;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-letter", { yPercent: 115, duration: 1.1, stagger: 0.045 }, 0.3)
        .from(".hero-status", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.7")
        .from(".hero-sub", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".hero-bio", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-hint", { autoAlpha: 0, duration: 1 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={t.id}
      className="relative z-10 flex min-h-screen flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20">
        <a
          href={t.contactHref}
          className="hero-status mb-10 inline-flex w-fit items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-neutral-200 transition-colors duration-300 hover:border-emerald-400/60 hover:text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 [animation-duration:2.2s]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t.status}
        </a>

        <h1 className="text-[clamp(2.4rem,9.5vw,8rem)] font-bold uppercase leading-[1.12] tracking-tight text-white">
          <LetterLine text="Mahmut Efe" />
          <LetterLine text="Türkol" />
        </h1>

        <div className="hero-sub mt-10 flex items-center gap-4">
          <span className="h-px w-12 bg-gold" />
          {/* Rol metni İngilizce: Türkçe locale "i"yi "İ" yapmasın diye lang="en" */}
          <p lang="en" className="font-mono text-sm uppercase tracking-[0.25em] text-gold">
            {t.role}
          </p>
        </div>

        <p className="hero-bio mt-8 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {t.bio}
        </p>

        <div className="hero-cta mt-12 flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-8">
          <Magnetic>
            <a
              href={t.cvHref}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:brightness-110"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
              </svg>
              {t.cvLabel}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={t.projectsHref}
              className="inline-block rounded-full border border-white/25 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {t.projectsLabel}
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={t.contactHref}
              className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
            >
              {t.contactLabel}
            </a>
          </Magnetic>
        </div>
      </div>

      <p className="hero-hint absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 sm:block">
        {t.scroll}
      </p>
    </section>
  );
}
