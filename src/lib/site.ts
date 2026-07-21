// Canlı domain belli olunca Vercel'de NEXT_PUBLIC_SITE_URL ortam
// değişkenini ayarlamak yeterli; kod değişikliği gerekmez.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
