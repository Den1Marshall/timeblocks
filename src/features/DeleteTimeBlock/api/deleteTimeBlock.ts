import { ITimeBlock } from '@/entities/TimeBlock';
import { User } from '@/entities/user';
import { db } from '@/shared/config';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteTimeBlock = async (
  userUid: User['uid'],
  timeBlockId: ITimeBlock['id']
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await deleteDoc(timeBlockRef);
};
