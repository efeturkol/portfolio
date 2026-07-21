import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { content, langs, type Lang } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const meta = content[lang].meta;
  // "/" Türkçe sayfaya rewrite edilir; /tr yerine kök adres kanonik kabul edilir
  const path = lang === "tr" ? "/" : "/en";

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    verification: {
      google: "rN1FGTrEVQo6Ukzco_qgY4QJL7xx_W06LdANnathmuA",
    },
    alternates: {
      canonical: path,
      languages: { tr: "/", en: "/en" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: "Mahmut Efe Türkol",
      locale: meta.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahmut Efe Türkol",
  jobTitle: "Backend Developer",
  url: siteUrl,
  email: "mailto:mahmutefeturkol@hotmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "İnönü Üniversitesi",
  },
  sameAs: [
    "https://github.com/efeturkol",
    "https://linkedin.com/in/efeturkol",
  ],
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const lang = (await params).lang as Lang;

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
