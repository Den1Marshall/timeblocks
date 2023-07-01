import { Stack, Typography } from '@mui/material';
import { FC, memo } from 'react';

interface TimeBlockTimeProps {
  hours: string;
  minutes: string;
  seconds: string;
  time: number;
}

const TimeBlockTime: FC<TimeBlockTimeProps> = memo(
  ({ hours, minutes, seconds, time }) => {
    return (
      <Stack
        direction={'row'}
        gap={0.4}
        justifyContent={'center'}
        textAlign={'center'}
        alignItems={'center'}
      >
        <Typography>
          {hours}:{minutes}:{seconds}
        </Typography>
        <Typography>/</Typography>
        <Typography display={'inline-block'}>
          {Math.floor(time / 3600)
            .toString()
            .padStart(2, '0')}
          :
          {Math.floor((time % 3600) / 60)
            .toString()
            .padStart(2, '0')}
          :
          {Math.floor(time % 60)
            .toString()
            .padStart(2, '0')}
        </Typography>
      </Stack>
    );
  }
);

export default TimeBlockTime;
