import { ImageResponse } from "next/og";
import { content, langs, type Lang } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mahmut Efe Türkol — Backend Developer | AI & LLM Integration";

// Yalnızca tanımlı diller üretilir; geçersiz parametre 500 yerine 404 döner
export const dynamicParams = false;
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const raw = (await params).lang;
  const lang: Lang = langs.includes(raw as Lang) ? (raw as Lang) : "tr";
  const tagline = content[lang].ogTagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "#d4a853",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              letterSpacing: "8px",
              color: "#d4a853",
            }}
          >
            BACKEND DEVELOPER · AI &amp; LLM
          </div>
        </div>
        <div style={{ fontSize: "96px", fontWeight: 700, lineHeight: 1.1 }}>
          Mahmut Efe Türkol
        </div>
        <div
          style={{
            marginTop: "40px",
            fontSize: "32px",
            color: "#a3a3a3",
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    size
  );
}
