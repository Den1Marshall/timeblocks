import { Time } from '@internationalized/date';

export interface TimeBlock {
  id: string;
  title: string;
  startTime: Time;
  endTime: Time;
  duration: Time;
  elapsed: Time;
  timerStartTime: number | null;
  color: string;
  lastUpdated: string;
  isNotificationSent: boolean;
}
