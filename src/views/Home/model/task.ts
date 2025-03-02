// import { ZonedDateTime } from '@internationalized/date';

export interface Task {
  id: string;
  title: string;
  description: string;
  // deadline: ZonedDateTime | null;
  isCompleted: boolean;
  // priority: 'none' | 'low' | 'medium' | 'high';
}
