import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';

export const addTimeBlock = async (
  userUid: string,
  timeBlocks: ITimeBlock[],
  timeBlock: ITimeBlock
) => {
  const userRef = doc(db, 'users', userUid);

  await updateDoc(userRef, {
    timeBlocks: JSON.stringify([...timeBlocks, timeBlock]),
  });
};
