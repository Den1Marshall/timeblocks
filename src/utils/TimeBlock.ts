import dayjs from 'dayjs';

export interface TimeBlock {
  id: number;
  name: string;
  timeStart: dayjs.Dayjs;
  timeEnd: dayjs.Dayjs;
  duration: number;
  color: string;

  progressPercent: number;
  elapsed: number;
  // public doneForDay = 0;
  // public doneForWeek = 0;
  // public doneForMonth = 0;
  // public doneForYear = 0;
}
