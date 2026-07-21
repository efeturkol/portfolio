"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { content, type Lang } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ lang }: { lang: Lang }) {
  const t = content[lang].contact;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".contact-label", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".contact-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".contact-line", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 80%" },
      });
      gsap.from(".contact-item", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-items", start: "top 88%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={t.id}
      className="relative z-10 flex min-h-screen flex-col justify-center py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-16 flex items-center gap-6">
          <p className="contact-label font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {t.label}
          </p>
          <span className="contact-rule h-px flex-1 bg-white/15" />
        </div>

        <h2 className="contact-heading text-[clamp(2.4rem,9.5vw,8rem)] font-bold uppercase leading-[1.12] tracking-tight text-white">
          {t.lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="contact-line block">{line}</span>
            </span>
          ))}
        </h2>

        <div className="contact-items mt-16">
          <p className="contact-item max-w-md leading-relaxed text-neutral-400">
            {t.body}
          </p>

          <div className="contact-item mt-12">
            <Magnetic>
              <a
                href={`mailto:mahmutefeturkol@hotmail.com?subject=${encodeURIComponent(t.mailSubject)}`}
                className="inline-block rounded-full border border-gold px-10 py-5 font-mono text-xs uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-base"
              >
                {t.button}
              </a>
            </Magnetic>
          </div>

          <div className="contact-item mt-14 flex flex-wrap gap-x-10 font-mono text-xs uppercase tracking-[0.2em]">
            <a
              href="mailto:mahmutefeturkol@hotmail.com"
              className="inline-block break-all py-3 lowercase tracking-normal text-neutral-400 transition-colors hover:text-white"
            >
              mahmutefeturkol@hotmail.com
            </a>
            <a
              href="https://github.com/efeturkol"
              target="_blank"
              rel="noopener noreferrer"
              lang="en"
              className="inline-block py-3 text-neutral-400 transition-colors hover:text-white"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/efeturkol"
              target="_blank"
              rel="noopener noreferrer"
              lang="en"
              className="inline-block py-3 text-neutral-400 transition-colors hover:text-white"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
