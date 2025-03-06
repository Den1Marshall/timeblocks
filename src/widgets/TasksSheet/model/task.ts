// TODO: date, time, priority

export interface Task {
  id: string;
  createdAt: string; // TODO: use Firestore Timestamp for createdAt?
  title: string;
  description: string;
  isCompleted: boolean;
}
