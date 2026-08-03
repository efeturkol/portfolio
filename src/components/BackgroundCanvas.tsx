"use client";

import dynamic from "next/dynamic";

// Three.js (~150kB) ilk yükleme paketine girmesin diye arka plan
// yalnızca istemcide, ayrı bir chunk olarak yüklenir.
const Background = dynamic(() => import("./MetBackground"), {
  ssr: false,
});

export default function BackgroundCanvas() {
  return <Background />;
}
