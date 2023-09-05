import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useEffect, useRef, useState } from 'react';

const HomeTimeLine: FC = () => {
  const [now, setNow] = useState<dayjs.Dayjs>(dayjs());

  const offsetHour = now.hour() * 7.5;
  const offsetMinute = now.minute() * 0.125;

  let hour: string = now.hour().toString();
  if (now.hour() < 10) {
    hour = '0' + hour;
  }

  let minute: string = now.minute().toString();
  if (now.minute() < 10) {
    minute = '0' + minute;
  }

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

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box ref={ref}>
      <Stack
        position={'absolute'}
        top={`${offsetHour + offsetMinute}vh`}
        left={0}
        direction={'row'}
        alignItems={'center'}
        width={'100%'}
        mt={'4px'}
      >
        <Box sx={{ pr: 1 }}>
          <Typography color={'primary.main'} variant='caption'>
            {hour}:{minute}
          </Typography>
        </Box>
        <Stack
          direction={'row'}
          width={'100%'}
          alignItems={'center'}
          position={'relative'}
        >
          <Box
            borderRadius={'50%'}
            width={8}
            height={8}
            sx={{ bgcolor: 'primary.main' }}
          ></Box>
          <Box width={'100%'} height={'1px'} bgcolor={'primary.main'}></Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomeTimeLine;
