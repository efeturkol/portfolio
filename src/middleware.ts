import { NextResponse, type NextRequest } from "next/server";

// Türkçe ana dildir ve kök adreste yaşar: "/" içerik olarak /tr'yi sunar
// (dahili rewrite), /tr'ye doğrudan gelen istekler köke yönlendirilir ki
// aynı içerik iki ayrı URL'de görünmesin. İngilizce sürüm /en altındadır.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/tr";
    return NextResponse.rewrite(url);
  }

  // Yalnızca /tr sayfasının kendisi köke yönlendirilir; /tr/opengraph-image
  // gibi alt kaynaklar oldukları yerde kalır (og:image bu adresi kullanır).
  if (pathname === "/tr" || pathname === "/tr/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tr", "/tr/"],
};
