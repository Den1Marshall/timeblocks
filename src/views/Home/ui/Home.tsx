import { AddTimeBlock } from '@/widgets/AddTimeBlock';
import { EditTimeBlock } from '@/widgets/EditTimeBlock';
import { TimeBlocks } from '@/widgets/TimeBlocks';
import { TodaysDate } from './TodaysDate';
import { Title } from '@/shared/ui';
import { TasksSheet } from './task/TasksSheet';

export default function Home() {
  return (
    <main className='w-full h-full flex flex-col items-start overflow-hidden'>
      <div className='w-full flex flex-row justify-between gap-2'>
        <Title>
          Home
          <TodaysDate />
        </Title>

        <TasksSheet />
      </div>

      <TimeBlocks AddTimeBlock={<AddTimeBlock />} />

      <EditTimeBlock />
    </main>
  );
}
