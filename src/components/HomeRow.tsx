import { Box, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useRef } from 'react';
import { TimeBlock } from '../utils/TimeBlock';
import HomeTimeBlock from './TimeBlock/HomeTimeBlock';

interface HomeRowProps {
  date: dayjs.Dayjs;
  timeBlocks: TimeBlock[];
}

const HomeRow: FC<HomeRowProps> = ({ date, timeBlocks }) => {
  const ref = useRef<HTMLDivElement>();

  let hour: string = date.hour() + ':00';

  if (date.hour() < 10) {
    hour = '0' + hour;
  }

  return (
    <Box ref={ref} borderTop={'0.5px solid grey'}>
      <Stack direction={'row'} height={'10vh'}>
        <Paper square sx={{ position: 'relative', bottom: '11px', pr: 1 }}>
          <Typography variant='caption'>{hour}</Typography>
        </Paper>
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
              date={date}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomeRow;
