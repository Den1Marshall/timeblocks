'use client';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { Logout } from './Logout';
import { ChangeEmail } from './ChangeEmail/ChangeEmail';
import { DeleteAccount } from './DeleteAccount/DeleteAccount';
import { ChangePassword } from './ChangePassword/ChangePassword';
import { useAppSelector } from '@/app/redux';

export default function Settings() {
  const isGoogleProvider =
    useAppSelector((state) => state.userSliceReducer.user?.providerId) ===
    'google.com';

  return (
    <main className='flex flex-col gap-5'>
      <h1 className='text-4xl font-bold lg:text-center'>
        Settings
        <Divider className='mt-2.5' />
      </h1>

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
    </main>
  );
}
