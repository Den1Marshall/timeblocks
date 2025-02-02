'use client';
import { FC } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { ThemeSelector } from './ThemeSelector/ThemeSelector';
import { NotificationsSwitch } from './NotificationsSwitch/NotificationsSwitch';

export const Preferences: FC = () => {
  return (
    <Card as='article'>
      <CardHeader>
        <h2>Preferences</h2>
      </CardHeader>

      <CardBody className='items-start gap-2.5'>
        <div className='w-full flex items-center justify-between px-4'>
          <p className='text-sm'>Notifications</p>
          <NotificationsSwitch />
        </div>

        <div className='w-full flex items-center justify-between px-4'>
          <p className='text-sm'>Theme</p> <ThemeSelector />
        </div>
      </CardBody>
    </Card>
  );
};
