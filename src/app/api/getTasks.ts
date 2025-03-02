import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { Task } from '@/views/Home';
import { collection, getDocs } from 'firebase/firestore';

export const getTasks = async (userUid: IUser['uid']): Promise<Task[]> => {
  const tasks: Task[] = [];

  const querySnapshot = await getDocs(
    collection(db, 'users', userUid, 'tasks')
  );

  if (querySnapshot.empty) return [];

  querySnapshot.forEach((doc) => {
    const taskDoc = doc.data();

    tasks.push(taskDoc as Task);
  });

  return tasks;
};
