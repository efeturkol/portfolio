"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Partiküller: sayfa başında MET, ortada dağınık ambiyans, sonda tekrar MET.
// Formasyon scroll ilerlemesine bağlı; yatay-pinned Projeler bölümü ortada
// (dağınık bölge) kaldığı için efekt onunla çakışmaz.
export default function MetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Her mount KENDİ canvas'ını oluştursun. React StrictMode dev'de bileşen
    // iki kez mount olur; tek paylaşılan canvas'ta ilk unmount context'i
    // kaybedince ikinci mount renderer kuramıyor ve canvas beyaza dönüp koyu
    // body'yi örtüyordu. Taze canvas ile context çakışması imkânsız.
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "pointer-events-none fixed inset-0 z-0";
    container.appendChild(canvas);
    // context kaybında tarayıcı geri yükleyebilsin (varsayılan iptali önle)
    const onCtxLost = (e: Event) => e.preventDefault();
    canvas.addEventListener("webglcontextlost", onCtxLost);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 320;

    const isMobile = window.innerWidth < 768;

    // --- "MET" yazısını gizli canvas'a çizip dolu pikselleri hedef nokta yap ---
    const TW = 640;
    const TH = 260;
    const tc = document.createElement("canvas");
    tc.width = TW;
    tc.height = TH;
    const tx = tc.getContext("2d");
    if (!tx) return;
    tx.fillStyle = "#fff";
    tx.font = '900 200px Arial, "Helvetica Neue", sans-serif';
    tx.textAlign = "center";
    tx.textBaseline = "middle";
    tx.fillText("MET", TW / 2, TH / 2 + 8);
    const img = tx.getImageData(0, 0, TW, TH).data;

    // MET'i viewport genişliğine sığdır: z=0'da kameranın gördüğü genişlik
    // en-boy oranıyla değişir; dar (portre) ekranda çarpanı küçültüp MET'in
    // kenarlardan taşmasını engelle. Masaüstünde 0.6'da kalır (üst sınır).
    const aspect = window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 1;
    const visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    const visW = visH * aspect;
    const fit = (0.82 * visW) / TW; // görünür genişliğin ~%82'sine sığdır
    // fit sonlu değilse (ör. ölçüm 0 iken) 0.6'ya düş; NaN pozisyonları önle
    const SCALE = Number.isFinite(fit) ? Math.min(0.6, fit) : 0.6;

    const pts: [number, number, number][] = [];
    const step = isMobile ? 5 : 3;
    for (let y = 0; y < TH; y += step) {
      for (let x = 0; x < TW; x += step) {
        if (img[(y * TW + x) * 4 + 3] > 128) {
          pts.push([
            (x - TW / 2) * SCALE,
            -(y - TH / 2) * SCALE,
            (Math.random() - 0.5) * 14,
          ]);
        }
      }
    }
    const COUNT = pts.length;

    const home = new Float32Array(COUNT * 3); // dağınık ambiyans konumu
    const targ = new Float32Array(COUNT * 3); // MET hedef konumu
    const phase = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    // Lacivert–beyaz arası cool "yıldız tozu": soft periwinkle + seyrek icy-beyaz.
    // Muted tutulduğu için öndeki yazıyı baltalamaz.
    const periwinkle = new THREE.Color(0x9fb0d8);
    const icy = new THREE.Color(0xd6def2);
    for (let i = 0; i < COUNT; i++) {
      home[i * 3] = (Math.random() - 0.5) * 780;
      home[i * 3 + 1] = (Math.random() - 0.5) * 470;
      home[i * 3 + 2] = (Math.random() - 0.5) * 320;
      targ[i * 3] = pts[i][0];
      targ[i * 3 + 1] = pts[i][1];
      targ[i * 3 + 2] = pts[i][2];
      phase[i] = Math.random() * Math.PI * 2;
      const c = Math.random() < 0.2 ? icy : periwinkle;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pos = new Float32Array(home);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 1.7 : 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const group = new THREE.Group();
    group.add(new THREE.Points(geo, mat));
    scene.add(group);

    const smooth = (x: number) => {
      x = Math.min(1, Math.max(0, x));
      return x * x * (3 - 2 * x);
    };

    // --- Formasyonu BÖLÜMLERE çapala (yüzdeye değil), böylece pinned
    // Projeler bölümü araya girmez: MET yalnız Hero'da ve İletişim'de oluşur.
    // Dil bağımsız: ilk section = Hero, son section = İletişim.
    const mainEl = document.querySelector("main");
    const secs = mainEl
      ? (Array.from(mainEl.querySelectorAll(":scope > section")) as HTMLElement[])
      : [];
    const heroEl = secs[0];
    const contactEl = secs[secs.length - 1];

    let heroOut = 0; // 0: Hero tepede (MET) → 1: Hero geçildi (dağınık)
    let contactIn = 0; // 0: İletişim uzakta (dağınık) → 1: İletişim geldi (MET)
    const triggers: ScrollTrigger[] = [];
    if (heroEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            heroOut = self.progress;
          },
        })
      );
    }
    if (contactEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: contactEl,
          start: "top bottom",
          end: "top center",
          onUpdate: (self) => {
            contactIn = self.progress;
          },
        })
      );
    }

    // Projeler pin'i kurulduktan SONRA konumları yeniden hesapla; yoksa
    // İletişim tetikleyicisi projelerin ortasında erken ateşler.
    const refreshSoon = () => ScrollTrigger.refresh();
    requestAnimationFrame(refreshSoon);
    const refreshTimer = window.setTimeout(refreshSoon, 600);
    let f = 0;

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const targetF = Math.max(1 - smooth(heroOut), smooth(contactIn));
      f += (targetF - f) * 0.08;
      const scatter = 1 - f;
      const t = clock.getElapsedTime();

      for (let i = 0; i < COUNT; i++) {
        const k = i * 3;
        const dx = Math.cos(t * 0.4 + phase[i]) * 3 * scatter;
        const dy = Math.sin(t * 0.5 + phase[i]) * 3 * scatter;
        pos[k] = home[k] + (targ[k] - home[k]) * f + dx;
        pos[k + 1] = home[k + 1] + (targ[k + 1] - home[k + 1]) * f + dy;
        pos[k + 2] = home[k + 2] + (targ[k + 2] - home[k + 2]) * f;
      }
      geo.attributes.position.needsUpdate = true;

      // dağınıkken hafif döner, MET olunca sabitlenir
      group.rotation.y = scatter * 0.25 * Math.sin(t * 0.1);
      mat.opacity = 0.42 + f * 0.26;

      // fare paralaksı yalnız dağınıkken; MET okunur kalsın diye sabit
      camera.position.x += (mouse.x * 22 * scatter - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 14 * scatter - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    });

    // pin/dinamik içerik yüklenince ölçüler tazelensin
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      triggers.forEach((tr) => tr.kill());
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      // Bu mount'a ait canvas'ı DOM'dan kaldır; sonraki mount taze bir canvas
      // oluşturacağı için forceContextLoss bir daha mount'u bozamaz.
      canvas.removeEventListener("webglcontextlost", onCtxLost);
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden />;
}
