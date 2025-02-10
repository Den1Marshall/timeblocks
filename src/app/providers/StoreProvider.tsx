'use client';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../redux';
import { IUser, userSliceActions } from '@/entities/User';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { ITimeBlock } from '@/entities/TimeBlock';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/config';

interface StoreProviderProps extends PropsWithChildren {
  user?: IUser;
  timeBlocks: ITimeBlock[];
}

export const StoreProvider: FC<StoreProviderProps> = ({
  user,
  timeBlocks,
  children,
}) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(userSliceActions.initializeUser(user));
    storeRef.current.dispatch(
      timeBlocksSliceActions.initializeTimeBlocks(timeBlocks)
    );
  }

  useEffect(() => {
    if (!user?.uid || !storeRef?.current) return; // ???

    const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      const serverTimeBlocks = JSON.parse(
        doc.get('timeBlocks') ?? JSON.stringify([])
      );

      storeRef?.current?.dispatch(
        timeBlocksSliceActions.initializeTimeBlocks(serverTimeBlocks)
      );
    });

    return () => unsub();
  }, [user?.uid]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
