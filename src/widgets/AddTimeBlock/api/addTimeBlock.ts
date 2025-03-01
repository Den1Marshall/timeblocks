import { ITimeBlock } from '@/entities/TimeBlock';
import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { serialize } from '@/shared/lib';
import { doc, setDoc } from 'firebase/firestore';

export const addTimeBlock = async (
  userUid: IUser['uid'],
  timeBlock: ITimeBlock
) => {
  await setDoc(
    doc(db, 'users', userUid, 'timeBlocks', timeBlock.id),
    serialize(timeBlock)
  );
};
