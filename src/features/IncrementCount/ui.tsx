'use client';
import { FC } from 'react';

interface IncrementCountProps {
  incrementCount: () => void;
}

export const IncrementCount: FC<IncrementCountProps> = ({ incrementCount }) => {
  return (
    <button onClick={incrementCount} className='underline'>
      Increment count
    </button>
  );
};
