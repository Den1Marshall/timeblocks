import { TimeBlock } from '@/entities/timeBlock';
import { User } from '@/entities/user';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';

export const markNotified = async (
  userUid: User['uid'],
  timeBlockId: TimeBlock['id']
): Promise<void> => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await updateDoc(timeBlockRef, { isNotified: true });
};
