'use client';

import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { FC } from 'react';
import { ChangeEmail } from './ChangeEmail/ChangeEmail';
import { ChangePassword } from './ChangePassword/ChangePassword';
import { Logout } from './Logout/Logout';
import { DeleteAccount } from './DeleteAccount/DeleteAccount';
import { useAppSelector } from '@/app/redux';

export const Account: FC = () => {
  const isGoogleProvider =
    useAppSelector((state) => state.userSliceReducer.user?.providerId) ===
    'google.com';

  return (
    <Card as={'article'}>
      <CardHeader>
        <h2>Account</h2>
      </CardHeader>

      <CardBody className='items-start gap-2.5'>
        <ChangeEmail isGoogleProvider={isGoogleProvider} />
        <ChangePassword isGoogleProvider={isGoogleProvider} />

        <Divider className='my-2.5' />

        <Logout />
        <DeleteAccount isGoogleProvider={isGoogleProvider} />
      </CardBody>
    </Card>
  );
};
