import { Account } from './Account/Account';
import { Support } from './Support/Support';
import { Preferences } from './Preferences/Preferences';
import { Title } from '@/shared/ui';

export default function Settings() {
  return (
    <main>
      <Title>Settings</Title>

      <div className='flex flex-col gap-5'>
        <Preferences />

        <Account />

        <Support />
      </div>
    </main>
  );
}
