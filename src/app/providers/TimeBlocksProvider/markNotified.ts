import { ITimeBlock } from '@/entities/TimeBlock';
import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';

export const markNotified = async (
  userUid: IUser['uid'],
  timeBlockId: ITimeBlock['id']
): Promise<void> => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await updateDoc(timeBlockRef, { isNotified: true });
};
