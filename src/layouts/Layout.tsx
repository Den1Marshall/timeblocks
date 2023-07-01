import { FC } from 'react';
import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
};

export default Layout;
