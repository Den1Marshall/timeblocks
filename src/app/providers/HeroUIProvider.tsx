'use client';

import { FC, PropsWithChildren } from 'react';
import { HeroUIProvider as Provider, ToastProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { useLocale } from 'next-intl';
import { useMediaQuery } from 'usehooks-ts';
import { defaultTransition } from '@/shared/ui';

export const HeroUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const locale = useLocale();

  const md = useMediaQuery('(width >= 48rem)');

  return (
    <Provider
      navigate={router.push}
      locale={locale}
      disableRipple
      reducedMotion='user'
      className='w-full h-full lg:flex'
    >
      <ThemeProvider attribute='class'>
        <ToastProvider
          placement={md ? undefined : 'top-center'}
          toastProps={{
            classNames: { base: 'max-sm:mt-safe-or-4' },
            motionProps: { transition: defaultTransition },
          }}
        />

        {children}
      </ThemeProvider>
    </Provider>
  );
};
