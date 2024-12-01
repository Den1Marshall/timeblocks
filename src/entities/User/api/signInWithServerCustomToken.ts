import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/shared/config';
import { getValidCustomToken } from 'next-firebase-auth-edge/lib/next/client';

export async function signInWithServerCustomToken(serverCustomToken: string) {
  const customToken = await getValidCustomToken({
    serverCustomToken,
    refreshTokenUrl: '/api/refresh-token',
  });

  if (!customToken) throw new Error('Invalid custom token');

  return signInWithCustomToken(auth, customToken);
}
