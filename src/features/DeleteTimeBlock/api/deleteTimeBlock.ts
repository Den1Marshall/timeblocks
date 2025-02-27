import { ITimeBlock } from '@/entities/TimeBlock';
import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteTimeBlock = async (
  userUid: IUser['uid'],
  timeBlockId: ITimeBlock['id']
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await deleteDoc(timeBlockRef);
};
