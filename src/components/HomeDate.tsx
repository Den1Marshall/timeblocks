import { Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const HomeDate: FC = () => {
  const [time, setTime] = useState<number>(Date.now());

  useEffect(() => {
    const updateAtMidnight = () => {
      const now = Date.now();

      const midnight = new Date(now);

      midnight.setHours(24, 0, 0, 0);

      const timeUntilMidnight = midnight.getTime() - now;

      const timeout = setTimeout(() => {
        setTime(Date.now());

        updateAtMidnight();
      }, timeUntilMidnight);

      return () => clearTimeout(timeout);
    };

    updateAtMidnight();
  }, []);

  const month = Intl.DateTimeFormat('en-US', { month: 'long' })
    .format(time)
    .toLowerCase();

  const date = Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(time);

  const dayOfWeek = Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(time);

  return (
    <Typography mb={6} textAlign={'center'} variant='h4' fontWeight={300}>
      {date} {month}, {dayOfWeek}
    </Typography>
  );
};

export default HomeDate;
