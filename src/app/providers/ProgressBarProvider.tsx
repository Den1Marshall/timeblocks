'use client';

import { FC, PropsWithChildren } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

// TODO: custom progress bar
// TODO: nextui color?
export const ProgressBarProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}

      <ProgressBar shallowRouting options={{ showSpinner: false }} />
    </>
  );
};
