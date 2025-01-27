import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { getLocalTimeZone, now } from '@internationalized/date';
import { doc, updateDoc } from 'firebase/firestore';

export const startTimeBlock = async (
  userUid: string,
  timeBlocks: ITimeBlock[],
  timeBlockId: string,
  timerStartTime: number
) => {
  const userRef = doc(db, 'users', userUid);

  await updateDoc(userRef, {
    timeBlocks: JSON.stringify(
      timeBlocks.map((timeBlock: ITimeBlock) =>
        timeBlock.id === timeBlockId
          ? {
              ...timeBlock,
              timerStartTime,
              lastUpdated: now(getLocalTimeZone()).toString(),
            }
          : timeBlock
      )
    ),
  });
};
