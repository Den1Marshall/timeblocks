'use client';
import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from './store';
import { userSliceActions } from './slices/userSlice';
import { User } from '../auth';

interface StoreProviderProps extends PropsWithChildren {
  user?: User;
}

export const StoreProvider: FC<StoreProviderProps> = ({ user, children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(userSliceActions.initializeUser(user));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
