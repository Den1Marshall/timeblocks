import { TimeBlock } from '@/entities/timeBlock';
import { User } from '@/entities/user';
import { db } from '@/shared/config';
import { serialize } from '@/shared/lib';
import { doc, setDoc } from 'firebase/firestore';

export const addTimeBlock = async (
  userUid: User['uid'],
  timeBlock: TimeBlock
) => {
  await setDoc(
    doc(db, 'users', userUid, 'timeBlocks', timeBlock.id),
    serialize(timeBlock)
  );
};
