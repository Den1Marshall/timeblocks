'use client';

import { FC, PropsWithChildren } from 'react';
import { HeroUIProvider as Provider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

export const HeroUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <Provider
      navigate={router.push}
      disableRipple
      reducedMotion='user'
      className='w-full h-full lg:flex'
    >
      <ThemeProvider attribute='class'>{children}</ThemeProvider>
    </Provider>
  );
};
