import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now, Time } from '@internationalized/date';

export const resetTimeBlocks = async (
  userUid: string,
  timeBlocks: ITimeBlock[]
): Promise<void> => {
  const userRef = doc(db, 'users', userUid);

  await updateDoc(userRef, {
    timeBlocks: JSON.stringify(
      timeBlocks.map((timeBlock: ITimeBlock) => ({
        ...timeBlock,
        elapsed: new Time(0, 0, 0, 0),
        timerStartTime: null,
        lastUpdated: now(getLocalTimeZone()).toString(),
        isNotificationSent: false,
      }))
    ),
  });
};
