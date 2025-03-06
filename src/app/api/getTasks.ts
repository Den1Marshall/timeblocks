import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { Task } from '@/widgets/TasksSheet';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const getTasks = async (userUid: IUser['uid']): Promise<Task[]> => {
  const tasks: Task[] = [];

  const tasksQuery = query(
    collection(db, 'users', userUid, 'tasks'),
    orderBy('isCompleted', 'asc'),
    orderBy('createdAt', 'asc')
  );

  const querySnapshot = await getDocs(tasksQuery);

  if (querySnapshot.empty) return [];

  querySnapshot.forEach((doc) => {
    const taskDoc = doc.data();

    tasks.push(taskDoc as Task);
  });

  return tasks;
};
