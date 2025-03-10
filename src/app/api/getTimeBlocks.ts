import { TimeBlock } from '@/entities/timeBlock';
import { User } from '@/entities/user';
import { db } from '@/shared/config';
import { collection, getDocs } from 'firebase/firestore';

export const getTimeBlocks = async (
  userUid: User['uid']
): Promise<TimeBlock[]> => {
  const timeBlocks: TimeBlock[] = [];

  const querySnapshot = await getDocs(
    collection(db, 'users', userUid, 'timeBlocks')
  );

  if (querySnapshot.empty) return [];

  querySnapshot.forEach((doc) => {
    const timeBlockDoc = doc.data();

    timeBlocks.push(timeBlockDoc as TimeBlock);
  });

  return timeBlocks;
};
