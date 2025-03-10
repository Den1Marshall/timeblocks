'use client';

import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../redux';
import { User, userSliceActions } from '@/entities/user';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { TimeBlock } from '@/entities/timeBlock';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/config';
import { isEqual } from 'lodash';

interface StoreProviderProps extends PropsWithChildren {
  user?: User;
  timeBlocks: TimeBlock[];
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

    const unsubscribe = onSnapshot(
      collection(db, 'users', user.uid, 'timeBlocks'),
      (querySnapshot) => {
        const serverTimeBlocks: TimeBlock[] = [];

        if (querySnapshot.empty) {
          storeRef?.current?.dispatch(
            timeBlocksSliceActions.initializeTimeBlocks(serverTimeBlocks)
          );

          return;
        }

        querySnapshot.forEach((doc) => {
          const timeBlockDoc = doc.data();

          serverTimeBlocks.push(timeBlockDoc as TimeBlock);
        });

        if (isEqual(serverTimeBlocks, timeBlocks)) return;

        storeRef?.current?.dispatch(
          timeBlocksSliceActions.initializeTimeBlocks(serverTimeBlocks)
        );
      }
    );

    return () => unsubscribe();
  }, [user?.uid, timeBlocks]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
