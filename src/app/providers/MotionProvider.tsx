'use client';

import { FC, ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { defaultTransition } from '@/shared/ui';

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider: FC<MotionProviderProps> = ({ children }) => {
  return (
    <MotionConfig reducedMotion='user' transition={defaultTransition}>
      {children}
    </MotionConfig>
  );
};
