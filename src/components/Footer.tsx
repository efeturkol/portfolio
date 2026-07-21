export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-6 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600">
        <p>© {new Date().getFullYear()} Mahmut Efe Türkol</p>
      </div>
    </footer>
  );
}
