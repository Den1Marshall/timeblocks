import { IUser } from '@/entities/User';
import { db } from '@/shared/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const addNewUserToDb = async (userUid: IUser['uid']): Promise<void> => {
  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', userUid), {});
  }
};
