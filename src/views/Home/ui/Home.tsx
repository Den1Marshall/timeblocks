'use client';
import { ITimeBlock } from '@/entities/TimeBlock';
import { AddTimeBlock } from '@/widgets/AddTimeBlock';
import { EditTimeBlock } from '@/widgets/EditTimeBlock';
import { TimeBlocks } from '@/widgets/TimeBlocks';
import { useState } from 'react';
import { TodaysDate } from './TodaysDate';

export default function Home() {
  const [timeBlockToEdit, setTimeBlockToEdit] = useState<ITimeBlock | null>(
    null
  );

  return (
    <main className='w-full h-full flex flex-wrap items-start'>
      <TodaysDate />

      <TimeBlocks
        AddTimeBlock={<AddTimeBlock />}
        setTimeBlockToEdit={setTimeBlockToEdit}
      />

      <EditTimeBlock
        timeBlockToEdit={timeBlockToEdit}
        setTimeBlockToEdit={setTimeBlockToEdit}
      />
    </main>
  );
}
