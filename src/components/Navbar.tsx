"use client";

import { useEffect, useState } from "react";
import { content, type Lang } from "@/lib/content";

export default function Navbar({ lang }: { lang: Lang }) {
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-base/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href={t.homeHref}
          className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-white sm:text-xs sm:tracking-[0.18em]"
        >
          Mahmut Efe Türkol
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-5 md:flex lg:gap-8">
          {t.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white lg:tracking-[0.2em]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:mahmutefeturkol@hotmail.com"
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-gold transition-opacity hover:opacity-70 lg:tracking-[0.2em]"
            >
              {t.contactCta}
            </a>
          </li>
          <li>
            <a
              href={t.switchHref}
              aria-label={t.switchAria}
              className="whitespace-nowrap rounded-full border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-300 transition-colors hover:border-gold hover:text-gold"
            >
              {t.switchLabel}
            </a>
          </li>
        </ul>

        {/* Mobile: language switch + menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={t.switchHref}
            aria-label={t.switchAria}
            className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-300 transition-colors hover:border-gold hover:text-gold"
          >
            {t.switchLabel}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-neutral-300 transition-colors hover:text-white"
            aria-label={open ? t.menuClose : t.menuOpen}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="9" x2="20" y2="9" />
                  <line x1="4" y1="15" x2="20" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-white/10 bg-base/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {t.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
