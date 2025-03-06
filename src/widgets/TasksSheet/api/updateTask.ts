import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '../model/task';

export const updateTask = async (userUid: IUser['uid'], task: Task) => {
  const taskRef = doc(db, 'users', userUid, 'tasks', task.id);

  await updateDoc(taskRef, { ...task });
};
