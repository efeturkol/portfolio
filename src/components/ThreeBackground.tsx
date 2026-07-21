"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // WebGL desteklenmiyorsa arka plan sade siyah kalır, site çalışmaya devam eder
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.014);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.z = 80;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 500 : 1400;
    const GOLD_COUNT = isMobile ? 40 : 110;

    const group = new THREE.Group();
    scene.add(group);

    // Ana parçacık alanı: beyaz ağırlıklı, mavi/mor/altın tonlarıyla
    const palette: [THREE.Color, number][] = [
      [new THREE.Color(0xffffff), 0.5], // beyaz
      [new THREE.Color(0x5b8cff), 0.2], // mavi
      [new THREE.Color(0x9a6bff), 0.18], // mor
      [new THREE.Color(0xd4a853), 0.12], // altın
    ];
    const pickColor = () => {
      let r = Math.random();
      for (const [color, weight] of palette) {
        if ((r -= weight) <= 0) return color;
      }
      return palette[0][0];
    };

    const basePositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      basePositions[i * 3] = (Math.random() - 0.5) * 240;
      basePositions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      basePositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      phases[i] = Math.random() * Math.PI * 2;
      const color = pickColor();
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(basePositions.slice(), 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.55,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(geometry, material));

    // Seyrek altın parçacıklar
    const goldPositions = new Float32Array(GOLD_COUNT * 3);
    for (let i = 0; i < GOLD_COUNT * 3; i += 3) {
      goldPositions[i] = (Math.random() - 0.5) * 220;
      goldPositions[i + 1] = (Math.random() - 0.5) * 130;
      goldPositions[i + 2] = (Math.random() - 0.5) * 110;
    }
    const goldGeometry = new THREE.BufferGeometry();
    goldGeometry.setAttribute("position", new THREE.BufferAttribute(goldPositions, 3));
    const goldMaterial = new THREE.PointsMaterial({
      color: 0xd4a853,
      size: 1.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(goldGeometry, goldMaterial));

    // Fare etkileşimi: kamera hedefe doğru yumuşakça kayar
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
    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();

      // Yavaş dalga hareketi
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3;
        positionAttr.array[idx + 1] =
          basePositions[idx + 1] + Math.sin(t * 0.4 + phases[i]) * 2.2;
        positionAttr.array[idx] =
          basePositions[idx] + Math.cos(t * 0.3 + phases[i]) * 1.4;
      }
      positionAttr.needsUpdate = true;

      group.rotation.y = t * 0.02;

      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      goldGeometry.dispose();
      material.dispose();
      goldMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
