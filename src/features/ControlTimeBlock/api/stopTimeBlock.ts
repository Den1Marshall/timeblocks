import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now } from '@internationalized/date';
import { serialize } from '@/shared/lib';
import { User } from '@/entities/user';
import { TimeBlock } from '@/entities/timeBlock';

export const stopTimeBlock = async (
  userUid: User['uid'],
  timeBlockId: TimeBlock['id'],
  elapsed: TimeBlock['elapsed']
) => {
  const timeBlockRef = doc(db, 'users', userUid, 'timeBlocks', timeBlockId);

  await updateDoc(timeBlockRef, {
    elapsed: serialize(elapsed),
    timerStartTime: null,
    lastUpdated: now(getLocalTimeZone()).toString(),
  });
};
