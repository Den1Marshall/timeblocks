import { getTokens as nextFirebaseAuthEdgeGetTokens } from 'next-firebase-auth-edge';
import { cookies, headers } from 'next/headers';

export const getTokens = async () => {
  const tokens = await nextFirebaseAuthEdgeGetTokens(await cookies(), {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: process.env.AUTH_FIREBASE_COOKIE_NAME!,
    cookieSignatureKeys: [
      process.env.AUTH_COOKIE_SIGNATURE_KEY!,
      process.env.AUTH_COOKIE_SIGNATURE_KEY2!,
    ],
    serviceAccount: {
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!,
    },
    headers: await headers(),
  });

  return tokens ?? undefined;
};
