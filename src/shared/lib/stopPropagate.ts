import { FormEvent } from 'react';

export const stopPropagate = (callback: () => void) => {
  return (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    callback();
  };
};
