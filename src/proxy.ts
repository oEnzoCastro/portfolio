import { type NextRequest, NextResponse } from "next/server";
import { isLocale, preferredLocale, swapLocale } from "@/i18n/config";

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathHasLocale = isLocale(pathname.split("/")[1]);

  if (!pathHasLocale) {
    const acceptLanguage = request.headers.get("accept-language");

    const locale = preferredLocale(acceptLanguage);

    const newPathname = swapLocale(pathname, locale);
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
