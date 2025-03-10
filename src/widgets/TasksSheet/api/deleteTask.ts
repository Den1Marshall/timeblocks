import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { Task } from '../model/task';

export const deleteTask = async (
  userUid: IUser['uid'],
  taskId: Task['id']
): Promise<void> => {
  const taskRef = doc(db, 'users', userUid, 'tasks', taskId);

  await deleteDoc(taskRef);
};
