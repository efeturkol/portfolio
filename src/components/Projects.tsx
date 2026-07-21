"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, type Lang, type ProjectItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const tagStyles: Record<string, string> = {
  React: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  "React Native": "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  TypeScript: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  Supabase: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Leaflet: "border-green-400/30 bg-green-400/10 text-green-300",
  Python: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  BERTurk: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  "Fine-tuning": "border-red-400/30 bg-red-400/10 text-red-300",
  NLP: "border-purple-400/30 bg-purple-400/10 text-purple-300",
  RAG: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  LLM: "border-purple-400/30 bg-purple-400/10 text-purple-300",
  Azure: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  PostgreSQL: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
  "scikit-learn": "border-orange-400/30 bg-orange-400/10 text-orange-300",
  "Random Forest": "border-green-400/30 bg-green-400/10 text-green-300",
  SHAP: "border-teal-400/30 bg-teal-400/10 text-teal-300",
  Expo: "border-neutral-400/30 bg-neutral-400/10 text-neutral-300",
  "Next.js": "border-neutral-300/30 bg-neutral-300/10 text-neutral-100",
  "Three.js": "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  GSAP: "border-green-400/30 bg-green-400/10 text-green-300",
};

function ProjectPanel({
  project,
  demoDefault,
  closedLabel,
}: {
  project: ProjectItem;
  demoDefault: string;
  closedLabel: string;
}) {
  return (
    <article className="project-panel flex w-full shrink-0 flex-col justify-center border-t border-white/10 px-6 py-12 sm:px-14 md:h-full md:w-[58vw] md:border-l md:border-t-0 md:py-0">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm text-gold">{project.index}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          {project.status}
        </span>
      </div>

      <h3
        lang={project.titleLang}
        className="mt-8 text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-[1.08] tracking-tight text-white"
      >
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-gold"
          >
            {project.title} <span aria-hidden>↗</span>
          </a>
        ) : (
          project.title
        )}
      </h3>

      <p className="mt-8 max-w-md leading-relaxed text-neutral-400">
        {project.description}
      </p>

      <div lang="en" className="mt-8 flex max-w-md flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
              tagStyles[tag] ?? "border-white/15 bg-white/5 text-neutral-300"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-[#0a0a0a]"
          >
            {project.demoLabel ?? demoDefault}
            <span aria-hidden>↗</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            lang="en"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </a>
        )}
        {!project.demo && !project.github && (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">
            {closedLabel}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Projects({ lang }: { lang: Lang }) {
  const t = content[lang].projects;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Masaüstü: yatay sinematik kaydırma, bölüm sabitlenir
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -getDistance(), ease: "none" }, 0).to(
        ".projects-progress",
        { scaleX: 1, ease: "none" },
        0
      );
    });

    // Mobil / azaltılmış hareket: dikey liste, yumuşak girişler
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
        gsap.from(panel, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 85%" },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={t.id}
      className="relative z-10 overflow-hidden md:h-screen"
    >
      <div className="absolute left-0 right-0 top-0 z-10 mx-auto flex max-w-6xl items-center gap-6 px-6 pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          {t.label}
        </p>
        <span className="hidden h-px flex-1 bg-white/15 md:block" />
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 md:block">
          {t.hint}
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col pt-40 md:h-full md:w-max md:flex-row md:items-stretch md:pt-0"
      >
        {/* Giriş paneli */}
        <div className="flex h-auto w-full shrink-0 flex-col justify-center px-6 pb-16 sm:px-14 md:h-full md:w-[42vw] md:pb-0">
          <h2 className="text-[clamp(2.4rem,7vw,5.5rem)] font-bold uppercase leading-[1.1] tracking-tight text-white">
            {t.heading}
          </h2>
        </div>

        {t.items.map((project) => (
          <ProjectPanel
            key={project.title}
            project={project}
            demoDefault={t.demoDefault}
            closedLabel={t.closedLabel}
          />
        ))}

        {/* Kapanış paneli */}
        <div className="flex h-auto w-full shrink-0 items-center justify-center border-t border-white/10 px-6 py-16 md:h-full md:w-[38vw] md:border-l md:border-t-0 md:py-0">
          <a
            href="https://github.com/efeturkol"
            target="_blank"
            rel="noopener noreferrer"
            lang="en"
            className="text-center font-mono text-sm uppercase tracking-[0.25em] text-neutral-400 transition-colors hover:text-gold"
          >
            {t.allGithub}
            <br />↗
          </a>
        </div>
      </div>

      {/* İlerleme çubuğu */}
      <div className="absolute bottom-10 left-1/2 hidden h-px w-48 -translate-x-1/2 bg-white/15 md:block">
        <div className="projects-progress h-full w-full origin-left scale-x-0 bg-gold" />
      </div>
    </section>
  );
}
