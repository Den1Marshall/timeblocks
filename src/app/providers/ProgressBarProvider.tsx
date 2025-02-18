'use client';

import { FC, PropsWithChildren } from 'react';
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

// TODO: custom progress bar
// TODO: nextui color?
export const ProgressBarProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProgressProvider shallowRouting options={{ showSpinner: false }}>
      {children}
    </ProgressProvider>
  );
};
