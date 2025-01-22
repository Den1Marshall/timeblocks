import { ITimeBlock } from '@/entities/TimeBlock';
import { Time } from '@internationalized/date';

export const deserializeTimeBlock = ({
  startTime,
  endTime,
  elapsed,
  serverElapsed,
  duration,
  ...rest
}: ITimeBlock): ITimeBlock => ({
  ...rest,
  startTime: new Time(
    startTime.hour,
    startTime.minute,
    startTime.second,
    startTime.millisecond
  ),
  endTime: new Time(
    endTime.hour,
    endTime.minute,
    endTime.second,
    endTime.millisecond
  ),
  elapsed: new Time(
    elapsed.hour,
    elapsed.minute,
    elapsed.second,
    elapsed.millisecond
  ),
  serverElapsed: new Time(
    serverElapsed.hour,
    serverElapsed.minute,
    serverElapsed.second,
    serverElapsed.millisecond
  ),
  duration: new Time(
    duration.hour,
    duration.minute,
    duration.second,
    duration.millisecond
  ),
});

export const deserializeTimeBlocks = (
  timeBlocks: ITimeBlock[]
): ITimeBlock[] => {
  return timeBlocks.map(deserializeTimeBlock);
};
