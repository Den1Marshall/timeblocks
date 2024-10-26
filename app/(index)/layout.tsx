import { StoreProvider } from '@/app/providers';
import { Nav } from '@/widgets/Nav';
import { PropsWithChildren } from 'react';
import { getTokens } from '../getTokens';
import { tokenToUser } from '@/entities/User';

export default async function Layout({ children }: PropsWithChildren) {
  const tokens = await getTokens();

  if (!tokens) throw new Error('No tokens, not logged in');

  const user = tokenToUser(tokens);

  return (
    <>
      <Nav />
      <div className='max-lg:pb-safe-offset-16'>
        <StoreProvider user={user}>{children}</StoreProvider>
      </div>
    </>
  );
}
