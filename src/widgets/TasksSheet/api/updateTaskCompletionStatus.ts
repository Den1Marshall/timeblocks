import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '../model/task';

export const updateTaskCompletionStatus = async (
  userUid: IUser['uid'],
  id: Task['id'],
  isCompleted: Task['isCompleted']
): Promise<void> => {
  const taskRef = doc(db, 'users', userUid, 'tasks', id);

  await updateDoc(taskRef, { isCompleted: isCompleted });
};
