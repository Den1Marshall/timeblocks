import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';

export const deleteTimeBlock = async (
  userUid: string,
  timeBlocks: ITimeBlock[],
  timeBlockId: string
) => {
  const userRef = doc(db, 'users', userUid);

  await updateDoc(userRef, {
    timeBlocks: JSON.stringify(
      timeBlocks.filter((timeBlock) => timeBlock.id !== timeBlockId)
    ),
  });
};
