import { Divider } from '@heroui/react';
import { AccountSettings } from './AccountSettings/AccountSettings';
import { Support } from './Support/Support';

export default function Settings() {
  return (
    <main className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>
        Settings
        <Divider className='mt-2.5' />
      </h1>

      <AccountSettings />

      <Support />
    </main>
  );
}
