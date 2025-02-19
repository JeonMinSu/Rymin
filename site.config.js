const CONFIG = {
  // profile setting (required)
  page:
  {
    cover: "/cover.jpg",
  },

  profile: {
    name: "Minsu, Jeon(Rymin)",
    image: "/avatar_02.jpg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Game Developer",
    bio: "라이민의 개발 블로그",
    email: "minsu_jj@naver.com",
    github: "JeonMinSu",
    instagram: "https://www.instagram.com/j_mansuor/",

  },
  projects: [
    {
      name: `Minsu`,
      href: "https://github.com/JeonMinSu",
    },
  ],
  // blog setting (required)
  blog: {
    title: "RYMIN",
    description: "Welcome to Rymin blog!",
    theme: "auto", // ['light', 'dark', 'auto']
  },

  // CONFIG configration (required)
  link: "https://morethan-log.vercel.app",
  since: 2022, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  seo: {
    keywords: ["Blog", "Website", "Notion"],
  },

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "JeonMinSu/Rymin",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: true,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}

module.exports = { CONFIG }
