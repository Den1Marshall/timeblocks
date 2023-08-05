import { Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, memo } from 'react';
import { msToTime } from '../../utils/msToTime';

interface TimeBlockTimeProps {
  timeStart: Dayjs;
  timeEnd: Dayjs;
  duration: number;
  elapsed: number;
}

const TimeBlockTime: FC<TimeBlockTimeProps> = memo(({ duration, elapsed }) => {
  return (
    <Stack
      direction={'row'}
      spacing={0.4}
      justifyContent={'center'}
      textAlign={'center'}
      alignItems={'center'}
    >
      <Typography>{msToTime(elapsed)}</Typography>
      <Typography>/</Typography>
      <Typography display={'inline-block'}>{msToTime(duration)}</Typography>
    </Stack>
  );
});

export default TimeBlockTime;
