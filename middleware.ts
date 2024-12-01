import { NextResponse, type NextRequest } from 'next/server';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';

const PUBLIC_PATHS = ['/login'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: process.env.AUTH_FIREBASE_LOGIN_PATH!,
    logoutPath: process.env.AUTH_FIREBASE_LOGOUT_PATH!,
    refreshTokenPath: process.env.AUTH_FIREBASE_REFRESH_TOKEN_PATH!,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: process.env.AUTH_FIREBASE_COOKIE_NAME!,
    cookieSignatureKeys: [
      process.env.AUTH_COOKIE_SIGNATURE_KEY!,
      process.env.AUTH_COOKIE_SIGNATURE_KEY2!,
    ],
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax' as const,
      maxAge: 12 * 60 * 60 * 24, // Twelve days
    },
    serviceAccount: {
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!,
    },
    enableMultipleCookies: true,

    handleValidToken: async (_tokens, headers) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },

    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason });

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      });
    },

    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    '/api/login',
    '/api/logout',
    '/api/refresh-token',
    '/',
    '/((?!_next|favicon.ico|api|.*\\.).*)',
  ],
};
