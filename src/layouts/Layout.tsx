import { FC } from 'react';
import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';
import WakeLock from '../components/WakeLock';

const Layout: FC = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
      <WakeLock />
    </>
  );
};

export default Layout;
