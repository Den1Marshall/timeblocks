'use client';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../redux';
import { IUser, userSliceActions } from '@/entities/User';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { ITimeBlock } from '@/entities/TimeBlock';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/config';
import {
  getLocalTimeZone,
  isEqualDay,
  now,
  parseZonedDateTime,
} from '@internationalized/date';
import { resetTimeBlock } from '@/features/ControlTimeBlock';

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

  useEffect(() => {
    if (!user?.uid) return;

    const outdatedTimeBlocks = timeBlocks.filter(
      (timeBlock: ITimeBlock) =>
        !isEqualDay(
          parseZonedDateTime(timeBlock.lastUpdated),
          now(getLocalTimeZone())
        )
    );

    outdatedTimeBlocks.forEach((timeBlock: ITimeBlock) =>
      resetTimeBlock(user.uid, timeBlocks, timeBlock.id)
    );

    const scheduleNextReset = (): NodeJS.Timeout => {
      const zonedToday = now(getLocalTimeZone());
      const zonedTomorrow = zonedToday
        .add({ days: 1 })
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

      const timeBeforeTomorrow = zonedTomorrow.compare(zonedToday);

      return setTimeout(() => {
        const outdatedTimeBlocks = timeBlocks.filter(
          (timeBlock: ITimeBlock) =>
            !isEqualDay(
              parseZonedDateTime(timeBlock.lastUpdated),
              now(getLocalTimeZone())
            )
        );

        outdatedTimeBlocks.map((timeBlock: ITimeBlock) =>
          resetTimeBlock(user.uid, timeBlocks, timeBlock.id)
        );

        scheduleNextReset();
      }, timeBeforeTomorrow);
    };

    const timeout = scheduleNextReset();

    return () => clearTimeout(timeout);
  }, [timeBlocks, user?.uid]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
