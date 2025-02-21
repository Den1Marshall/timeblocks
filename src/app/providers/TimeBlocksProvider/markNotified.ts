import { ITimeBlock } from '@/entities/TimeBlock';
import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { doc, updateDoc } from 'firebase/firestore';

export const markNotified = async (
  userUid: IUser['uid'],
  timeBlocks: ITimeBlock[],
  timeBlockId: ITimeBlock['id']
): Promise<void> => {
  const userRef = doc(db, 'users', userUid);

  await updateDoc(userRef, {
    timeBlocks: JSON.stringify(
      timeBlocks.map((timeBlock: ITimeBlock) =>
        timeBlock.id === timeBlockId
          ? {
              ...timeBlock,
              isNotificationSent: true,
            }
          : timeBlock
      )
    ),
  });
};
