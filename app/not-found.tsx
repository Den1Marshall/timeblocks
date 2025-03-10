'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push('/');
  }, []);

  return null;
}
