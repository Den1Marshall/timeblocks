import { ITimeBlock } from '@/entities/TimeBlock';
import { User } from '@/entities/user';
import { db } from '@/shared/config';
import { serialize } from '@/shared/lib';
import { doc, updateDoc } from 'firebase/firestore';

export const editTimeBlock = async (
  userUid: User['uid'],
  timeBlock: ITimeBlock
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlock.id);

  await updateDoc(timeBlockRef, { ...serialize(timeBlock) });
};
