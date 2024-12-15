import { Transition } from 'motion/react';

export const defaultTransition: Transition = {
  type: 'spring',
  visualDuration: 0.25,
  bounce: 0,
  restDelta: 0.001,
  restSpeed: 0.01,
};
