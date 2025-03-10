import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now } from '@internationalized/date';
import { serialize } from '@/shared/lib';
import { User } from '@/entities/user';
import { ITimeBlock } from '@/entities/TimeBlock';

export const stopTimeBlock = async (
  userUid: User['uid'],
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
