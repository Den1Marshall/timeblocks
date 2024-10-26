'use client';
import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../redux';
import { IUser, userSliceActions } from '@/entities/User';

interface StoreProviderProps extends PropsWithChildren {
  user?: IUser;
}

export const StoreProvider: FC<StoreProviderProps> = ({ user, children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(userSliceActions.initializeUser(user));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
