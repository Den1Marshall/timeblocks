'use client';
import { Navbar, NavbarContent } from '@nextui-org/react';
import { FC } from 'react';
import { NavItem } from './NavItem';
import { HomeIcon } from './HomeIcon';
import { SettingsIcon } from '@/shared/ui';

export const Nav: FC = () => {
  return (
    <Navbar
      className='fixed bottom-0 pb-safe top-[unset] lg:h-full lg:max-w-24 lg:pt-5'
      classNames={{ wrapper: 'px-0 lg:h-full' }}
    >
      <NavbarContent className='lg:flex-col'>
        <NavItem href='/' icon={<HomeIcon />}>
          Home
        </NavItem>

        <NavItem href='/settings' icon={<SettingsIcon />}>
          Settings
        </NavItem>
      </NavbarContent>
    </Navbar>
  );
};
