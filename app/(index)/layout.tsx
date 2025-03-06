import { StoreProvider, TimeBlocksProvider } from '@/app/providers';
import { Nav } from '@/widgets/Nav';
import { PropsWithChildren } from 'react';
import { getTokens } from '../getTokens';
import { signInWithServerCustomToken, tokenToUser } from '@/entities/User';
import { getTasks, getTimeBlocks } from '@/app/api';
import { ITimeBlock } from '@/entities/TimeBlock';
import { Task } from '@/widgets/TasksSheet';

export default async function Layout({ children }: PropsWithChildren) {
  const tokens = await getTokens();

  if (!tokens || !tokens.customToken)
    throw new Error('No tokens, not logged in');

  const user = tokenToUser(tokens);

  await signInWithServerCustomToken(tokens.customToken);

  let timeBlocks: ITimeBlock[] = [];
  let tasks: Task[] = [];

  try {
    const results = await Promise.all([
      getTimeBlocks(user.uid),
      getTasks(user.uid),
    ]);

    [timeBlocks, tasks] = results;
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }

  return (
    <div className='w-full h-full pt-5 pb-16 lg:pb-0 lg:pl-24'>
      <Nav />

      <StoreProvider user={user} timeBlocks={timeBlocks} tasks={tasks}>
        {children}

        <TimeBlocksProvider />
      </StoreProvider>
    </div>
  );
}
