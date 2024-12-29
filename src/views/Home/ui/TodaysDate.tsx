'use client';
import { FC, useEffect, useState } from 'react';

const getTodaysDate = () =>
  new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  });

export const TodaysDate: FC = () => {
  const [todaysDate, setTodaysDate] = useState(getTodaysDate());

  const updateTodaysDate = () => {
    setTodaysDate(getTodaysDate());
  };

  useEffect(() => {
    updateTodaysDate();

    const now = new Date();
    const delay = 1000 - now.getMilliseconds();

    let interval: NodeJS.Timeout | undefined = undefined;
    const timeout = setTimeout(() => {
      updateTodaysDate();
      interval = setInterval(updateTodaysDate, 1000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return <h1 className='text-3xl font-bold'>{todaysDate}</h1>;
};
