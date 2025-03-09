'use client';

import { FC, PropsWithChildren } from 'react';
import { HeroUIProvider as Provider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { useLocale } from 'next-intl';

export const HeroUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <Provider
      navigate={router.push}
      locale={locale}
      disableRipple
      reducedMotion='user'
      className='w-full h-full lg:flex'
    >
      <ThemeProvider attribute='class'>{children}</ThemeProvider>
    </Provider>
  );
};
