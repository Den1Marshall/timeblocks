import { db } from '@/shared/config';
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { getLocalTimeZone, now, Time } from '@internationalized/date';
import { IUser } from '@/entities/User';
import { serialize } from '@/shared/lib';

export const resetTimeBlocks = async (userUid: IUser['uid']): Promise<void> => {
  const timeBlocksRef = collection(db, 'users', userUid, 'timeBlocks');

  const timeBlocksSnapshot = await getDocs(timeBlocksRef);

  timeBlocksSnapshot.forEach((doc) => {
    updateDoc(doc.ref, {
      elapsed: serialize(new Time(0, 0, 0, 0)),
      timerStartTime: null,
      lastUpdated: now(getLocalTimeZone()).toString(),
      isNotificationSent: false,
    });
  });
};
