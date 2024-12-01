import { Time } from '@internationalized/date';
import { msToTime } from './msToTime';

export const calculateDuration = (startTime: Time, endTime: Time): string => {
  const deserializedStartTime = new Time(
    startTime?.hour,
    startTime?.minute,
    startTime?.second,
    startTime?.millisecond
  );

  const deserializedEndTime = new Time(
    endTime?.hour,
    endTime?.minute,
    endTime?.second,
    endTime?.millisecond
  );

  return msToTime(
    deserializedEndTime.compare(deserializedStartTime)
  ).toString();
};
