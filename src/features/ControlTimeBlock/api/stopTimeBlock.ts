import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now } from '@internationalized/date';
import { serialize } from '@/shared/lib';
import { IUser } from '@/entities/User';
import { ITimeBlock } from '@/entities/TimeBlock';

export const stopTimeBlock = async (
  userUid: IUser['uid'],
  timeBlockId: ITimeBlock['id'],
  elapsed: ITimeBlock['elapsed']
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await updateDoc(timeBlockRef, {
    elapsed: serialize(elapsed),
    timerStartTime: null,
    lastUpdated: now(getLocalTimeZone()).toString(),
  });
};
