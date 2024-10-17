'use client';
import { Count } from '@/entities/Count';
import { IncrementCount } from '@/features/IncrementCount';
import { FC, useState } from 'react';

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <article className='my-auto flex flex-col items-center justify-center'>
      <Count count={count} />
      <IncrementCount incrementCount={() => setCount(count + 1)} />
    </article>
  );
};
