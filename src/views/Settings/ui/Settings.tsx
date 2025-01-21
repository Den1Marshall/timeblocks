import { Divider } from '@heroui/react';
import { Account } from './Account/Account';
import { Support } from './Support/Support';
import { Preferences } from './Preferences/Prefernces';
import { Title } from '@/shared/ui';

export default function Settings() {
  return (
    <main className='flex flex-col gap-5'>
      <Title>
        Settings
        <Divider className='mt-2.5' />
      </Title>

      <Preferences />

      <Account />

      <Support />
    </main>
  );
}
