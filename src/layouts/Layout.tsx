import { FC } from 'react';
import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';
import WakeLockModal from '../components/WakeLockModal';
import WakeLock from '../components/WakeLock';

const Layout: FC = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
      <WakeLockModal />
      <WakeLock />
    </>
  );
};

export default Layout;
