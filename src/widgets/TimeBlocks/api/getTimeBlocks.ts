import { ITimeBlock } from '@/entities/TimeBlock';
import { db } from '@/shared/config';
import { doc, getDoc } from 'firebase/firestore';

export const getTimeBlocks = async (userUid: string): Promise<ITimeBlock[]> => {
  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);

  const timeBlocks: string | undefined = docSnap.get('timeBlocks');

  return timeBlocks ? JSON.parse(timeBlocks) : [];
};
