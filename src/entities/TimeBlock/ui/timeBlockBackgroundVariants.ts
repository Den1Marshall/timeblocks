import { Variants } from 'motion/react';

export const timeBlockBackgroundVariants: Variants = {
  enter: ({ completionPercentage, color }) => ({
    transform: `translateX(${completionPercentage - 100}%)`,
    background: color,
  }),

  exit: {
    transform: 'translateX(-100%)',
  },
};
