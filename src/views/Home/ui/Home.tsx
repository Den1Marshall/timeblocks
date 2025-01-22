'use client';
import { AddTimeBlock } from '@/widgets/AddTimeBlock';
import { EditTimeBlock } from '@/widgets/EditTimeBlock';
import { TimeBlocks } from '@/widgets/TimeBlocks';
import { TodaysDate } from './TodaysDate';
import { Title } from '@/shared/ui';

export default function Home() {
  return (
    <main className='w-full h-full flex flex-wrap items-start overflow-hidden'>
      <div className='flex flex-col gap-2'>
        <Title>Home</Title>
        <TodaysDate />
      </div>

      <TimeBlocks AddTimeBlock={<AddTimeBlock />} />

      <EditTimeBlock />
    </main>
  );
}
