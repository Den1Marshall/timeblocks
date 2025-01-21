'use client';
import { FC } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { SelectTheme } from './SelectTheme/SelectTheme';

export const Preferences: FC = () => {
  return (
    <Card as='article'>
      <CardHeader>
        <h2>Preferences</h2>
      </CardHeader>

      <CardBody className='items-start gap-2.5'>
        <div className='w-full flex items-center justify-between px-4'>
          <p className='text-sm'>Select theme</p> <SelectTheme />
        </div>
      </CardBody>
    </Card>
  );
};
