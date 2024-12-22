import { Time } from '@internationalized/date';

export interface ITimeBlock {
  id: string;
  title: string;
  startTime: Time;
  endTime: Time;
  duration: Time;
  elapsed: Time;
  serverElapsed: Time;
  timerStartTime: number | null;
  color: string;
}
