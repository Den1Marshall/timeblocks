import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { TimeBlock } from '../utils/TimeBlock';
import HomeTimeBlock from './TimeBlock/HomeTimeBlock';

interface HomeRowProps {
  date: dayjs.Dayjs;
  timeBlocks: TimeBlock[];
}

const HomeRow: FC<HomeRowProps> = ({ date, timeBlocks }) => {
  let hour: string | null = date.hour() + ':00';
  if (date.hour() < 10) {
    hour = '0' + hour;
  }

  const [now, setNow] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const t = setInterval(() => {
      if (now.minute() === dayjs().minute()) {
        return;
      } else {
        setNow(dayjs());
      }
    }, 100);

    return () => clearInterval(t);
  }, [now]);

  if (
    (now.hour() === date.hour() && now.minute() <= 15) ||
    (now.hour() + 1 === date.hour() && now.minute() >= 45)
  ) {
    hour = null;
  }

  return (
    <Stack direction={'row'} height={'7.5vh'}>
      <Typography
        position={'relative'}
        bottom={'10px'}
        pr={1}
        variant='caption'
      >
        {hour}
      </Typography>
      <Stack direction={'row'} spacing={1} width={'100%'}>
        {timeBlocks?.map((tb, i) => (
          <HomeTimeBlock
            key={i}
            id={tb.id}
            name={tb.name}
            timeStart={tb.timeStart}
            timeEnd={tb.timeEnd}
            duration={tb.duration}
            color={tb.color}
            progressPercent={tb.progressPercent}
            elapsed={tb.elapsed}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default HomeRow;
