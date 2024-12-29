import { Divider } from '@nextui-org/react';
import { AccountSettings } from './AccountSettings/AccountSettings';

export default function Settings() {
  return (
    <main className='flex flex-col gap-5'>
      <h1 className='text-4xl font-bold'>
        Settings
        <Divider className='mt-2.5' />
      </h1>

      <AccountSettings />
    </main>
  );
}
