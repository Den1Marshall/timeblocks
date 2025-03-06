'use client';

import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../redux';
import { IUser, userSliceActions } from '@/entities/User';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { ITimeBlock } from '@/entities/TimeBlock';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/shared/config';
import { isEqual } from 'lodash';
import * as Sentry from '@sentry/nextjs';
import { Task, tasksSliceActions } from '@/widgets/TasksSheet';

interface StoreProviderProps extends PropsWithChildren {
  user: IUser;
  timeBlocks: ITimeBlock[];
  tasks: Task[];
}

export const StoreProvider: FC<StoreProviderProps> = ({
  user,
  timeBlocks,
  tasks,
  children,
}) => {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(userSliceActions.initializeUser(user));
    storeRef.current.dispatch(
      timeBlocksSliceActions.initializeTimeBlocks(timeBlocks)
    );
    storeRef.current.dispatch(tasksSliceActions.initializeTasks(tasks));
  }

  useEffect(() => {
    if (!storeRef?.current) return; // ???

    const unsubscribe = onSnapshot(
      collection(db, 'users', user.uid, 'timeBlocks'),
      (querySnapshot) => {
        const serverTimeBlocks: ITimeBlock[] = [];

        if (querySnapshot.empty) {
          storeRef?.current?.dispatch(
            timeBlocksSliceActions.initializeTimeBlocks(serverTimeBlocks)
          );

          return;
        }

        querySnapshot.forEach((doc) => {
          const timeBlockDoc = doc.data();

          serverTimeBlocks.push(timeBlockDoc as ITimeBlock);
        });

        if (isEqual(serverTimeBlocks, timeBlocks)) return;

        storeRef?.current?.dispatch(
          timeBlocksSliceActions.initializeTimeBlocks(serverTimeBlocks)
        );
      }
    );

    return () => unsubscribe();
  }, [user.uid, timeBlocks]);

  useEffect(() => {
    if (!user?.uid) return;

    const tasksQuery = query(
      collection(db, 'users', user.uid, 'tasks'),
      orderBy('isCompleted', 'asc'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(
      tasksQuery,
      (querySnapshot) => {
        const tasks: Task[] = [];

        if (querySnapshot.empty) {
          storeRef?.current?.dispatch(tasksSliceActions.initializeTasks(tasks));

          return;
        }

        querySnapshot.forEach((doc) => {
          const taskDoc = doc.data();

          tasks.push(taskDoc as Task);
        });

        // if (isEqual(serverTimeBlocks, timeBlocks)) return;

        storeRef?.current?.dispatch(tasksSliceActions.initializeTasks(tasks));
      },
      (error) => {
        Sentry.captureException(error);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
