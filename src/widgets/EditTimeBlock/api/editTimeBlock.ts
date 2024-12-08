import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';

export const editTimeBlock = async (
  userUid: string,
  timeBlocks: ITimeBlock[],
  timeBlock: ITimeBlock
) => {
  const userRef = doc(db, 'users', userUid);

  timeBlocks = timeBlocks.map((tb) =>
    tb.id === timeBlock.id ? timeBlock : tb
  );

  await updateDoc(userRef, { timeBlocks: JSON.stringify(timeBlocks) });
};
