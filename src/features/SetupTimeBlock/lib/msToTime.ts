import { Time } from '@internationalized/date';

export const msToTime = (ms: number): Time => {
  const hour = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((ms / (1000 * 60)) % 60);
  const second = Math.floor((ms / 1000) % 60);
  const milliseconds = ms % 1000;

  return new Time(hour, minute, second, milliseconds);
};
