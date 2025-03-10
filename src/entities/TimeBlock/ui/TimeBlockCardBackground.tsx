'use client';

import { FC } from 'react';
import { motion, Variants } from 'motion/react';
import { TimeBlock } from '../model/timeBlock';

interface TimeBlockCardBackgroundProps {
  completionPercentage: number;
  color: TimeBlock['color'];
}

export const TimeBlockCardBackground: FC<TimeBlockCardBackgroundProps> = ({
  completionPercentage,
  color,
}) => {
  const timeBlockCardBackgroundVariants: Variants = {
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
      variants={timeBlockCardBackgroundVariants}
      custom={{ completionPercentage, color }}
      initial='exit'
      animate='enter'
      className='absolute top-0 left-0 w-full h-full opacity-60'
    />
  );
};
