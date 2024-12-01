'use client';
import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../redux';
import { IUser, userSliceActions } from '@/entities/User';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { ITimeBlock } from '@/entities/TimeBlock';

interface StoreProviderProps extends PropsWithChildren {
  user?: IUser;
  timeBlocks: ITimeBlock[];
}

export const StoreProvider: FC<StoreProviderProps> = ({
  user,
  timeBlocks,
  children,
}) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(userSliceActions.initializeUser(user));
    storeRef.current.dispatch(
      timeBlocksSliceActions.initializeTimeBlocks(timeBlocks)
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
