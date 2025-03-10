import { TimeBlock } from '@/entities/timeBlock';
import { User } from '@/entities/user';
import { db } from '@/shared/config';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteTimeBlock = async (
  userUid: User['uid'],
  timeBlockId: TimeBlock['id']
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await deleteDoc(timeBlockRef);
};
