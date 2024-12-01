import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const addTimeBlock = async (timeBlock: ITimeBlock, userUid: string) => {
  const userRef = doc(db, 'users', userUid);

  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);

  const timeBlocksJson = docSnap.get('timeBlocks');

  await updateDoc(userRef, {
    timeBlocks: timeBlocksJson
      ? JSON.stringify([...JSON.parse(timeBlocksJson), timeBlock])
      : JSON.stringify([timeBlock]),
  });
};
