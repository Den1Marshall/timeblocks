export interface TimeBlock {
  id: number;
  name: string;
  time: number;
  color: string;

  progressPercent: number;
  seconds: string;
  minutes: string;
  hours: string;
  elapsed: number;
  // public doneForDay = 0;
  // public doneForWeek = 0;
  // public doneForMonth = 0;
  // public doneForYear = 0;
}
