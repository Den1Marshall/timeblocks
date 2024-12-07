import { Time } from '@internationalized/date';

export const timeToMs = (time: Time): number => {
  return (
    time.hour * 60 * 60 * 1000 +
    time.minute * 60 * 1000 +
    time.second * 1000 +
    time.millisecond
  );
};
