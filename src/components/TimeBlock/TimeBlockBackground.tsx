import { Box } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { FC, memo } from 'react';

interface TimeBlockBackgroundProps {
  progressPercent: number;
  startTime: number | null;
  color: string;
}

const AnimatedBox = animated(Box);

const TimeBlockBackground: FC<TimeBlockBackgroundProps> = memo(
  ({ progressPercent, startTime, color }) => {
    const [spring] = useSpring(
      () => ({
        opacity: startTime === null ? 0.3 : 0.5,
        width: `${progressPercent}%`,
      }),
      [progressPercent, startTime]
    );

    return (
      <AnimatedBox
        position={'absolute'}
        top={0}
        left={0}
        height={'100%'}
        style={spring}
        sx={{
          backgroundColor: color,
        }}
      ></AnimatedBox>
    );
  }
);

export default TimeBlockBackground;
