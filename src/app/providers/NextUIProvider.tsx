'use client';
import { FC, PropsWithChildren } from 'react';
import { NextUIProvider as Provider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export const NextUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <Provider
      navigate={router.push}
      disableRipple
      reducedMotion='user'
      className='w-full h-full lg:flex'
    >
      {children}
    </Provider>
  );
};
