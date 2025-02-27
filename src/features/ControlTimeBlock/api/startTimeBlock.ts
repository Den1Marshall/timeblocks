import { ITimeBlock } from '@/entities/TimeBlock';
import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { getLocalTimeZone, now } from '@internationalized/date';
import { doc, updateDoc } from 'firebase/firestore';

export const startTimeBlock = async (
  userUid: IUser['uid'],
  timeBlockId: ITimeBlock['id'],
  timerStartTime: ITimeBlock['timerStartTime']
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await updateDoc(timeBlockRef, {
    timerStartTime,
    lastUpdated: now(getLocalTimeZone()).toString(),
  });
};
