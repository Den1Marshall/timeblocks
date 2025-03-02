import { doc, setDoc } from 'firebase/firestore';
import { Task } from '../model/task';
import { db } from '@/shared/config';
import { IUser } from '@/entities/User';

export const addNewTask = async (
  userUid: IUser['uid'],
  task: Task
): Promise<void> => {
  await setDoc(doc(db, 'users', userUid, 'tasks', task.id), { ...task });
};
