import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now, Time } from '@internationalized/date';

export const stopTimeBlock = async (
  userUid: string,
  timeBlocks: ITimeBlock[],
  timeBlockId: string,
  elapsed: Time
) => {
  const userRef = doc(db, 'users', userUid);

  await updateDoc(userRef, {
    timeBlocks: JSON.stringify(
      timeBlocks.map((timeBlock: ITimeBlock) =>
        timeBlock.id === timeBlockId
          ? {
              ...timeBlock,
              elapsed,
              timerStartTime: null,
              lastUpdated: now(getLocalTimeZone()).toString(),
            }
          : timeBlock
      )
    ),
  });
};
