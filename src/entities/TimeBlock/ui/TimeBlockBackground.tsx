'use client';

import { FC } from 'react';
import { motion, Variants } from 'motion/react';

interface TimeBlockBackgroundProps {
  completionPercentage: number;
  color: string;
}

export const TimeBlockBackground: FC<TimeBlockBackgroundProps> = ({
  completionPercentage,
  color,
}) => {
  const timeBlockBackgroundVariants: Variants = {
    enter: ({ completionPercentage, color }) => ({
      transform: `translateX(${completionPercentage - 100}%)`,
      background: color,
    }),

    exit: {
      transform: 'translateX(-100%)',
    },
  };

  return (
    <motion.div
      variants={timeBlockBackgroundVariants}
      custom={{ completionPercentage, color }}
      initial='exit'
      animate='enter'
      className='absolute top-0 left-0 w-full h-full opacity-60'
    />
  );
};
