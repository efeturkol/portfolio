export type Lang = "tr" | "en";

export const langs: Lang[] = ["tr", "en"];

export type ProjectItem = {
  index: string;
  title: string;
  // titleLang: başlık farklı dildeyse CSS uppercase doğru kuralı uygulasın (ör. İnşirah)
  titleLang?: string;
  description: string;
  tags: string[];
  demo?: string;
  demoLabel?: string;
  github?: string;
  status: string;
};

type SiteContent = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogLocale: string;
  };
  nav: {
    homeHref: string;
    links: { label: string; href: string }[];
    contactCta: string;
    menuOpen: string;
    menuClose: string;
    switchLabel: string;
    switchHref: string;
    switchAria: string;
  };
  hero: {
    id: string;
    status: string;
    role: string;
    bio: string;
    cvHref: string;
    cvLabel: string;
    projectsLabel: string;
    projectsHref: string;
    contactLabel: string;
    contactHref: string;
    scroll: string;
  };
  // lang: CSS uppercase'in yanlış locale kuralı uygulamaması için (ör. GitHub → GİTHUB)
  stats: { value: number; label: string; lang?: string }[];
  about: {
    id: string;
    label: string;
    lines: string[];
    body: string;
  };
  timeline: {
    id: string;
    label: string;
    entries: { year: string; title: string; description: string }[];
  };
  projects: {
    id: string;
    label: string;
    hint: string;
    heading: string;
    demoDefault: string;
    closedLabel: string;
    allGithub: string;
    items: ProjectItem[];
  };
  skills: {
    id: string;
    label: string;
    groups: { category: string; items: string[] }[];
  };
  contact: {
    id: string;
    label: string;
    lines: string[];
    body: string;
    button: string;
    mailSubject: string;
  };
  ogTagline: string;
};

export const content: Record<Lang, SiteContent> = {
  tr: {
    meta: {
      title: "Mahmut Efe Türkol — Backend Developer | AI & LLM",
      description:
        "İnönü Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisi. Backend geliştirme ve AI/LLM sistemleri (RAG, prompt engineering) üzerine çalışıyorum.",
      keywords: [
        "Mahmut Efe Türkol",
        "Backend Developer",
        "AI",
        "LLM",
        "RAG",
        "Yazılım Geliştirici",
        "Bilgisayar Mühendisliği",
        "Portfolyo",
      ],
      ogLocale: "tr_TR",
    },
    nav: {
      homeHref: "#ana-sayfa",
      links: [
        { label: "Hakkımda", href: "#hakkimda" },
        { label: "Deneyim", href: "#deneyim" },
        { label: "Projeler", href: "#projeler" },
        { label: "Yetenekler", href: "#yetenekler" },
        { label: "İletişim", href: "#iletisim" },
      ],
      contactCta: "Bana Ulaşın",
      menuOpen: "Menüyü aç",
      menuClose: "Menüyü kapat",
      switchLabel: "EN",
      switchHref: "/en",
      switchAria: "Switch to English",
    },
    hero: {
      id: "ana-sayfa",
      status: "Staj & İş Tekliflerine Açığım",
      role: "Backend Developer · AI & LLM Integration",
      bio: "İnönü Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Backend geliştirme ve AI/LLM sistemleri üzerine çalışıyorum.",
      cvHref: "/cv.pdf",
      cvLabel: "CV İndir",
      projectsLabel: "Projelerimi Gör",
      projectsHref: "#projeler",
      contactLabel: "İletişime Geç →",
      contactHref: "#iletisim",
      scroll: "Kaydır",
    },
    stats: [
      { value: 5, label: "Proje" },
      { value: 15, label: "Teknoloji" },
      { value: 10, label: "GitHub Repo", lang: "en" },
    ],
    about: {
      id: "hakkimda",
      label: "01 — Hakkımda",
      lines: ["Backend geliştirme ve", "AI/LLM sistemleri üzerine", "çalışıyorum."],
      body: "İnönü Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Backend geliştirme ve AI/LLM sistemleri (RAG, prompt engineering) üzerine çalışıyorum. IEEE ve Google DSC topluluklarında liderlik deneyimi kazandım.",
    },
    timeline: {
      id: "deneyim",
      label: "02 — Deneyim",
      entries: [
        {
          year: "2023",
          title: "İnönü Üniversitesi",
          description: "Bilgisayar Mühendisliği eğitimine başladım.",
        },
        {
          year: "2023 — 2024",
          title: "Google Developers Student Club — Core Team Member",
          description:
            "Etkinlik organizasyonunda ve teknik içerik üretiminde görev aldım.",
        },
        {
          year: "2024 — 2025",
          title: "Google Developers Student Club — Co-Lead",
          description:
            "Workshop ve hackathon etkinliklerinin planlanmasına ve yürütülmesine katkı sağladım; proje gruplarının oluşturulması ve koordinasyonunda görev aldım.",
        },
        {
          year: "2025 — 2026",
          title: "IEEE İnönü — Co-Lead & Denetleme Kurulu Başkanı",
          description:
            "Teknik etkinlik planlaması ve ekip koordinasyonunu yönettim; üye gelişim süreçlerinden sorumlu oldum.",
        },
        {
          year: "2026",
          title: "Microsoft Bulut Yaz Okulu — Yazılım & AI Stajyeri",
          description:
            "Phi-3.5 Mini, Foundry Local ve PostgreSQL kullanarak BDDK dokümanları için RAG asistanı geliştirdim; doküman parçalama, embedding, retrieval ve yanıt üretme süreçlerini uçtan uca uyguladım.",
        },
      ],
    },
    projects: {
      id: "projeler",
      label: "03 — Projeler",
      hint: "Kaydırmaya devam et",
      heading: "Projeler",
      demoDefault: "Canlı Demo",
      closedLabel: "Kod paylaşıma kapalı",
      allGithub: "Tümü GitHub'da",
      items: [
        {
          index: "01",
          title: "BDDK RAG Sistemi",
          description:
            "Bankacılık ve fintech sektörüne yönelik, BDDK düzenleyici uyum dokümanlarını temel alan RAG sistemi. Microsoft Bulut Yaz Okulu stajı kapsamında geliştirildi; çalışmalar sürüyor.",
          tags: ["RAG", "LLM", "Azure", "PostgreSQL"],
          github: "https://github.com/efeturkol/bddk-rag-assistant",
          status: "Devam Ediyor",
        },
        {
          index: "02",
          title: "Pan-Kanser Sınıflandırma",
          description:
            "801 örnek, 20.531 gen ve 5 kanser türü içeren pan-kanser RNA-Seq verisi üzerinde Random Forest modeli. SHAP ile açıklanabilirlik analizi; model ~%99,4 doğruluğa ulaştı.",
          tags: ["Python", "scikit-learn", "Random Forest", "SHAP"],
          status: "Akademik Araştırma",
        },
        {
          index: "03",
          title: "İnşirah",
          description:
            "Namaz vakitleri, dualar, Kur'an ve tesbih özelliklerini bir araya getiren iOS uygulaması. App Store'da yayında; reklam destekli ücretsiz model, premium altyapı etkinleştirilmeye hazır.",
          tags: ["React Native", "Expo", "TypeScript"],
          demo: "https://apps.apple.com/app/id6790176500",
          demoLabel: "App Store",
          status: "App Store'da Yayında",
        },
        {
          index: "04",
          title: "Gezio",
          description:
            "Kullanıcıya özel rota planlama ve interaktif harita entegrasyonu içeren kişiselleştirilmiş Türkiye seyahat planlayıcısı. Web sürümü tamamlandı; mobil uygulama olarak geliştirilmesi sürüyor.",
          tags: ["React", "TypeScript", "Supabase", "Leaflet"],
          demo: "https://gezio-delta.vercel.app",
          status: "Yayında",
        },
        {
          index: "05",
          title: "FarmaIQ",
          description:
            "Türkçe sosyal medya verilerinden olumsuz ilaç reaksiyonlarını tespit eden doğal dil işleme projesi. BERTurk modeli fine-tuning edilerek sınıflandırma gerçekleştirildi.",
          tags: ["Python", "BERTurk", "NLP", "Fine-tuning"],
          github: "https://github.com/efeturkol/farmaiq",
          status: "Tamamlandı",
        },
      ],
    },
    skills: {
      id: "yetenekler",
      label: "04 — Yetenekler",
      groups: [
        { category: "Diller", items: ["Python", "Java", "Kotlin", "TypeScript"] },
        { category: "AI / LLM", items: ["RAG", "scikit-learn"] },
        {
          category: "Frontend",
          items: ["JavaScript", "React", "HTML", "CSS", "React Native / Expo"],
        },
        { category: "Backend", items: ["Node.js", "REST API"] },
        { category: "Veritabanı", items: ["PostgreSQL", "Supabase"] },
        {
          category: "Araçlar",
          items: ["Git", "Vercel", "Microsoft Azure"],
        },
      ],
    },
    contact: {
      id: "iletisim",
      label: "05 — İletişim",
      lines: ["Bana", "Ulaşın"],
      body: "Staj ve yeni başlayan seviyesindeki iş fırsatları hakkında konuşmak ya da sadece merhaba demek için bana e-posta gönderebilirsiniz. En kısa sürede dönüş yaparım.",
      button: "E-posta Gönder",
      mailSubject: "Merhaba — Portfolyo üzerinden ulaşıyorum",
    },
    ogTagline: "Backend geliştirme ve AI/LLM sistemleri üzerine çalışıyorum.",
  },
  en: {
    meta: {
      title: "Mahmut Efe Türkol — Backend Developer | AI & LLM",
      description:
        "4th-year Computer Engineering student at İnönü University. Working on backend development and AI/LLM systems (RAG, prompt engineering).",
      keywords: [
        "Mahmut Efe Türkol",
        "Backend Developer",
        "AI",
        "LLM",
        "RAG",
        "Software Developer",
        "Computer Engineering",
        "Portfolio",
      ],
      ogLocale: "en_US",
    },
    nav: {
      homeHref: "#home",
      links: [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
      ],
      contactCta: "Contact Me",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      switchLabel: "TR",
      switchHref: "/",
      switchAria: "Türkçe sürüme geç",
    },
    hero: {
      id: "home",
      status: "Open to Internship & Job Offers",
      role: "Backend Developer · AI & LLM Integration",
      bio: "4th-year Computer Engineering student at İnönü University. I work on backend development and AI/LLM systems.",
      cvHref: "/cv-en.pdf",
      cvLabel: "Download CV",
      projectsLabel: "View My Projects",
      projectsHref: "#projects",
      contactLabel: "Get in Touch →",
      contactHref: "#contact",
      scroll: "Scroll",
    },
    stats: [
      { value: 5, label: "Projects" },
      { value: 15, label: "Technologies" },
      { value: 10, label: "GitHub Repos" },
    ],
    about: {
      id: "about",
      label: "01 — About",
      lines: ["I work on backend", "development and", "AI/LLM systems."],
      body: "I'm a 4th-year Computer Engineering student at İnönü University, working at the intersection of backend development and AI/LLM systems (RAG, prompt engineering). I gained leadership experience within the IEEE and Google DSC communities.",
    },
    timeline: {
      id: "experience",
      label: "02 — Experience",
      entries: [
        {
          year: "2023",
          title: "İnönü University",
          description: "Started my Computer Engineering degree.",
        },
        {
          year: "2023 — 2024",
          title: "Google Developers Student Club — Core Team Member",
          description:
            "Took part in event organization and technical content creation.",
        },
        {
          year: "2024 — 2025",
          title: "Google Developers Student Club — Co-Lead",
          description:
            "Contributed to the planning and execution of workshops and hackathons; took part in forming and coordinating project groups.",
        },
        {
          year: "2025 — 2026",
          title: "IEEE İnönü — Co-Lead & Supervisory Board Chair",
          description:
            "Led technical event planning and internal team coordination; owned member development processes.",
        },
        {
          year: "2026",
          title: "Microsoft Cloud Summer School — Software & AI Intern",
          description:
            "Built a RAG assistant for BDDK compliance documents using Phi-3.5 Mini, Foundry Local, and PostgreSQL; implemented the full pipeline end-to-end: document chunking, embedding, retrieval, and response generation.",
        },
      ],
    },
    projects: {
      id: "projects",
      label: "03 — Projects",
      hint: "Keep scrolling",
      heading: "Projects",
      demoDefault: "Live Demo",
      closedLabel: "Source code is private",
      allGithub: "All on GitHub",
      items: [
        {
          index: "01",
          title: "BDDK RAG System",
          description:
            "A RAG system built on BDDK (Turkish banking regulator) compliance documents for banking and fintech use cases. Developed during the Microsoft Cloud Summer School internship; work is still ongoing.",
          tags: ["RAG", "LLM", "Azure", "PostgreSQL"],
          github: "https://github.com/efeturkol/bddk-rag-assistant",
          status: "In Progress",
        },
        {
          index: "02",
          title: "Pan-Cancer Classification",
          description:
            "A Random Forest classifier built on a pan-cancer RNA-Seq dataset with 801 samples, 20,531 genes, and 5 cancer types. SHAP-based explainability added; the model achieved ~99.4% accuracy.",
          tags: ["Python", "scikit-learn", "Random Forest", "SHAP"],
          status: "Academic Research",
        },
        {
          index: "03",
          title: "İnşirah",
          titleLang: "tr",
          description:
            "An iOS app bringing together prayer times, supplications, Quran, and a dhikr counter. Published on the App Store; free with an ad-supported model and a premium system ready to be enabled.",
          tags: ["React Native", "Expo", "TypeScript"],
          demo: "https://apps.apple.com/app/id6790176500",
          demoLabel: "App Store",
          status: "Live on the App Store",
        },
        {
          index: "04",
          title: "Gezio",
          description:
            "A personalized Turkey travel planner featuring custom route planning and interactive map integration. The web version is complete; a mobile version is in development.",
          tags: ["React", "TypeScript", "Supabase", "Leaflet"],
          demo: "https://gezio-delta.vercel.app",
          status: "Live",
        },
        {
          index: "05",
          title: "FarmaIQ",
          description:
            "An NLP project detecting adverse drug reactions from Turkish social media data. A BERTurk model was fine-tuned for classification.",
          tags: ["Python", "BERTurk", "NLP", "Fine-tuning"],
          github: "https://github.com/efeturkol/farmaiq",
          status: "Completed",
        },
      ],
    },
    skills: {
      id: "skills",
      label: "04 — Skills",
      groups: [
        { category: "Languages", items: ["Python", "Java", "Kotlin", "TypeScript"] },
        { category: "AI / LLM", items: ["RAG", "scikit-learn"] },
        {
          category: "Frontend",
          items: ["JavaScript", "React", "HTML", "CSS", "React Native / Expo"],
        },
        { category: "Backend", items: ["Node.js", "REST API"] },
        { category: "Database", items: ["PostgreSQL", "Supabase"] },
        {
          category: "Tools",
          items: ["Git", "Vercel", "Microsoft Azure"],
        },
      ],
    },
    contact: {
      id: "contact",
      label: "05 — Contact",
      lines: ["Get In", "Touch"],
      body: "Feel free to email me about internships and entry-level opportunities — or just to say hi. I'll get back to you as soon as I can.",
      button: "Send an Email",
      mailSubject: "Hello — Reaching out via your portfolio",
    },
    ogTagline: "Working on backend development and AI/LLM systems.",
  },
};
