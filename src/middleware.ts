import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env";

export async function middleware(request: NextRequest) {
  // console.log("Middleware executed for:", request.url);

  const url = request.nextUrl.clone();

  const isProd = env.NODE_ENV === "production";

  try {
    const token = await getToken({
      req: request,
      secret: env.AUTH_SECRET,
      cookieName: `${isProd ? "__Secure-" : ""}authjs.session-token`,
    });

    // Define protected routes
    const protectedRoutes = ["/dashboard", "/account"];

    // Check if the requested path is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
      url.pathname.startsWith(route),
    );

    // Check if 2FA is required but not verified
    // const requires2FA = token?.requiresTwoFactor === true;

    // // Skip middleware for the verify-2fa page and its API
    // if (
    //   url.pathname === "/verify-2fa" ||
    //   url.pathname === "/api/auth/verify-2fa"
    // ) {
    //   return NextResponse.next();
    // }

    // // If 2FA is required, redirect to verification page
    // if (token && requires2FA && url.pathname !== "/verify-2fa") {
    //   return NextResponse.redirect(new URL("/verify-2fa", request.url));
    // }

    if (!isProtectedRoute) {
      return NextResponse.next();
    }

    // console.log(
    //   "Requested path:",
    //   url.pathname,
    //   "is protected route:",
    //   isProtectedRoute,
    // );
    // console.log("User token:", token);

    if (!token) {
      console.info("Redirected in the middleware, reason: missing token");

      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.debug("TODO: Redirerect to a error page");
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
