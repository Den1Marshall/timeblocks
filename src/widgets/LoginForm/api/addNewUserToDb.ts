import { db } from '@/shared/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const addNewUserToDb = async (userUid: string): Promise<void> => {
  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', userUid), {
      timeBlocks: '[]',
    });
  }
};