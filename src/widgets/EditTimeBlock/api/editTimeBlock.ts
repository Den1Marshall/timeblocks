import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const editTimeBlock = async (timeBlock: ITimeBlock, userUid: string) => {
  const userRef = doc(db, 'users', userUid);

  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);

  const timeBlocksJson = docSnap.get('timeBlocks');

  if (timeBlocksJson) {
    let timeBlocks: ITimeBlock[] = JSON.parse(timeBlocksJson);

    timeBlocks = timeBlocks.map((tb) =>
      tb.id === timeBlock.id ? timeBlock : tb
    );

    await updateDoc(userRef, { timeBlocks: JSON.stringify(timeBlocks) });
  } else {
    throw new Error('TimeBlock not found');
  }
};
