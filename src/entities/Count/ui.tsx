'use client';
import { FC } from 'react';

interface CountProps {
  count: number;
}

export const Count: FC<CountProps> = ({ count }) => {
  return <p>Count: {count}</p>;
};
