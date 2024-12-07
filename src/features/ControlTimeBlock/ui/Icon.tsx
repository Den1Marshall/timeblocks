'use client';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { iconVariants } from './iconVariants';

interface IconProps {
  isStarted: boolean;
}

export const Icon: FC<IconProps> = ({ isStarted }) => {
  return (
    <motion.svg
      variants={iconVariants}
      initial='exit'
      animate='enter'
      exit='exit'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-6'
    >
      <AnimatePresence initial={false} mode='popLayout'>
        {isStarted ? (
          <motion.path
            key={0}
            variants={iconVariants}
            initial='exit'
            animate='enter'
            exit='exit'
            fillRule='evenodd'
            d='M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z'
            clipRule='evenodd'
          />
        ) : (
          <motion.path
            key={1}
            variants={iconVariants}
            initial='exit'
            animate='enter'
            exit='exit'
            fillRule='evenodd'
            d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
            clipRule='evenodd'
          />
        )}
      </AnimatePresence>
    </motion.svg>
  );
};
