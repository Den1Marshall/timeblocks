import { ITimeBlock } from '@/entities/TimeBlock';
import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { collection, getDocs } from 'firebase/firestore';

export const getTimeBlocks = async (
  userUid: IUser['uid']
): Promise<ITimeBlock[]> => {
  const timeBlocks: ITimeBlock[] = [];

  const querySnapshot = await getDocs(
    collection(db, 'users', userUid, 'timeBlocks')
  );

  if (querySnapshot.empty) return [];

  querySnapshot.forEach((doc) => {
    const timeBlockDoc = doc.data();

    timeBlocks.push(timeBlockDoc as ITimeBlock);
  });

  return timeBlocks;
};
