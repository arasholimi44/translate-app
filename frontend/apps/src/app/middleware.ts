import NextAuth from "next-auth";
import { authConfig } from './auth.config';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const { auth } = NextAuth(authConfig);

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith('/user') || 
                    req.nextUrl.pathname.startsWith('/register');

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL('/user', req.url));
  }
}