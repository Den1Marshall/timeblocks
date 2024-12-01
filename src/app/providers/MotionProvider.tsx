'use client';
import { FC, ReactNode } from 'react';
import { MotionConfig } from 'motion/react';

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider: FC<MotionProviderProps> = ({ children }) => {
  return (
    <MotionConfig
      reducedMotion='user'
      transition={{
        type: 'spring',
        duration: 0.5,
        bounce: 0,
        restDelta: 0.0001,
        restSpeed: 0.0001,
      }}
    >
      {children}
    </MotionConfig>
  );
};
