import { Box } from '@mui/material';
import { FC, memo, useEffect, useRef } from 'react';

interface TimeBlockBackgroundProps {
  progressPercent: number;
  startTime: number | null;
  color: string;
}

const TimeBlockBackground: FC<TimeBlockBackgroundProps> = memo(
  ({ progressPercent, startTime, color }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.style.width = `${progressPercent}%`;
      }
    }, [progressPercent]);

    return (
      <Box
        ref={ref}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          transition:
            startTime !== null
              ? 'opacity .2s'
              : 'width .5s, background-color .1s, opacity .2s',
          backgroundColor: color,
          opacity: startTime !== null ? '0.5' : '0.3',
          zIndex: -1,
        }}
      ></Box>
    );
  }
);

export default TimeBlockBackground;
