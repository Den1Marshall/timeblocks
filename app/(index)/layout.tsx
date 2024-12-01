import { StoreProvider } from '@/app/providers';
import { Nav } from '@/widgets/Nav';
import { PropsWithChildren } from 'react';
import { getTokens } from '../getTokens';
import { signInWithServerCustomToken, tokenToUser } from '@/entities/User';
import { getTimeBlocks } from '@/widgets/TimeBlocks';

export default async function Layout({ children }: PropsWithChildren) {
  const tokens = await getTokens();

  if (!tokens) throw new Error('No tokens, not logged in');

  const user = tokenToUser(tokens);

  await signInWithServerCustomToken(tokens.customToken);

  const timeBlocks = await getTimeBlocks(user.uid);

  return (
    <>
      <Nav />
      <div className='w-full h-full pb-safe-offset-16 lg:py-5 lg:pl-24'>
        <StoreProvider user={user} timeBlocks={timeBlocks}>
          {children}
        </StoreProvider>
      </div>
    </>
  );
}
