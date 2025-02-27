import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now, Time } from '@internationalized/date';
import { serialize } from '@/shared/lib';
import { IUser } from '@/entities/User';
import { ITimeBlock } from '@/entities/TimeBlock';

export const resetTimeBlock = async (
  userUid: IUser['uid'],
  timeBlockId: ITimeBlock['id']
): Promise<void> => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await updateDoc(timeBlockRef, {
    elapsed: serialize(new Time(0, 0, 0, 0)),
    timerStartTime: null,
    lastUpdated: now(getLocalTimeZone()).toString(),
    isNotificationSent: false,
  });
};
