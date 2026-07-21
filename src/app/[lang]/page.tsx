import About from "@/components/About";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import type { Lang } from "@/lib/content";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Lang;

  return (
    <>
      <SmoothScroll />
      <BackgroundCanvas />
      <Navbar lang={lang} />
      <main className="relative">
        <Hero lang={lang} />
        <Stats lang={lang} />
        <About lang={lang} />
        <Timeline lang={lang} />
        <Projects lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer />
    </>
  );
}
