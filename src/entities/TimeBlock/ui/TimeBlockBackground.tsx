'use client';
import { FC } from 'react';
import { motion } from 'motion/react';
import { timeBlockBackgroundVariants } from './timeBlockBackgroundVariants';

interface TimeBlockBackgroundProps {
  completionPercentage: number;
  color: string;
}

export const TimeBlockBackground: FC<TimeBlockBackgroundProps> = ({
  completionPercentage,
  color,
}) => {
  return (
    <motion.div
      variants={timeBlockBackgroundVariants}
      custom={{ completionPercentage, color }}
      initial='exit'
      animate='enter'
      className='z-[-1] absolute top-0 left-0 w-full h-full opacity-60'
    />
  );
};
