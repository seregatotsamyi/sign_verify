import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";

const publicPages = ["/"];
const publicOnlyUnAuthPages = ["/login", "/registr"];
const privatePages = ["/dashboard", "/verify", "/reports"];
const adminPages = ["/administration"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.isAdmin;

  const isPublicPage = publicPages.some((page) => nextUrl.pathname === page);
  const isPublicOnlyUnAuthPage = publicOnlyUnAuthPages.some((page) => nextUrl.pathname.startsWith(page));
  const isPrivatePage = privatePages.some((page) => nextUrl.pathname.startsWith(page));
  const isAdminPage = adminPages.some((page) => nextUrl.pathname.startsWith(page));

  if (!isLoggedIn && !isPublicPage && !isPublicOnlyUnAuthPage && (isPrivatePage || isAdminPage)) {
    const newUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  if (isLoggedIn && isPublicOnlyUnAuthPage) {
    // Если авторизован и пытается зайти на страницу логина/регистрации - редирект на главную
    const newUrl = new URL("/", nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (isLoggedIn && !isAdmin && isAdminPage) {
    // Если авторизован и пытается зайти на страницу админа - редирект на назад
    const newUrl = new URL("/dashboard", nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: ["/", "/((?!api|static|.*\\..*|_next).*)"],
};
