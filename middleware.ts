import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // 1. Si no hay sesión, siempre redirigir a sign-in
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 2. Extraer el rol (con as any por la limitación de tipos de Better Auth)
  const userRole = (session.user as any)?.role;
  const { pathname } = request.nextUrl;

  // 3. Rutas que requieren ADMIN
  const adminRoutes = ["/users", "/reports"];
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute && userRole !== "ADMIN") {
    // Si es una ruta de admin y el usuario no lo es, volver al home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/", "/movements", "/users", "/reports"],
};