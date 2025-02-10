import { StoreProvider } from '@/app/providers';
import { Nav } from '@/widgets/Nav';
import { PropsWithChildren } from 'react';
import { getTokens } from '../getTokens';
import { signInWithServerCustomToken, tokenToUser } from '@/entities/User';
import { getTimeBlocks } from '@/widgets/TimeBlocks';
import { ResetOutdatedTimeBlocks } from '@/features/ResetOutdatedTimeBlocks';
import { UpdateBadge } from '@/features/UpdateBadge';

export default async function Layout({ children }: PropsWithChildren) {
  const tokens = await getTokens();

  if (!tokens) throw new Error('No tokens, not logged in');

  const user = tokenToUser(tokens);

  await signInWithServerCustomToken(tokens.customToken);

  const timeBlocks = await getTimeBlocks(user.uid);

  return (
    <div className='w-full h-full pt-5 pb-16 lg:pb-0 lg:pl-24'>
      <Nav />

      <StoreProvider user={user} timeBlocks={timeBlocks}>
        {children}

        <ResetOutdatedTimeBlocks />
        <UpdateBadge />
      </StoreProvider>
    </div>
  );
}
