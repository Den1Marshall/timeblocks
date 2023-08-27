import { Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, memo } from 'react';
import { msToTime } from '../../utils/msToTime';
import { Variant } from '@mui/material/styles/createTypography';

interface TimeBlockTimeProps {
  timeStart: Dayjs;
  timeEnd: Dayjs;
  duration: number;
  elapsed: number;
  variant?: Variant;
}

const TimeBlockTime: FC<TimeBlockTimeProps> = memo(
  ({ duration, elapsed, variant }) => {
    return (
      <Stack
        zIndex={1}
        direction={'row'}
        spacing={0.4}
        justifyContent={'center'}
        textAlign={'center'}
        alignItems={'center'}
      >
        <Typography variant={variant}>{msToTime(elapsed)}</Typography>
        <Typography variant={variant}>/</Typography>
        <Typography variant={variant} display={'inline-block'}>
          {msToTime(duration)}
        </Typography>
      </Stack>
    );
  }
);

export default TimeBlockTime;
