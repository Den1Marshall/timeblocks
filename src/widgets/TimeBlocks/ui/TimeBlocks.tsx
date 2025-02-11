'use client';
import { deserializeTimeBlocks, TimeBlock } from '@/entities/TimeBlock';
import { FC, ReactNode } from 'react';
import { useAppSelector } from '@/app/redux';
import { ControlTimeBlock } from '@/features/ControlTimeBlock';
import { DeleteTimeBlock } from '@/features/DeleteTimeBlock';
import { AnimatePresence } from 'motion/react';

interface TimeBlocksProps {
  AddTimeBlock: ReactNode;
}

export const TimeBlocks: FC<TimeBlocksProps> = ({ AddTimeBlock }) => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );

  return (
    <section className='w-full h-full flex flex-wrap justify-center items-start gap-10 overflow-y-auto no-scrollbar lg:justify-start'>
      <AnimatePresence mode='popLayout'>
        {timeBlocks.map((timeBlock) => (
          <TimeBlock
            key={timeBlock.id}
            timeBlock={timeBlock}
            ControlTimeBlock={<ControlTimeBlock timeBlock={timeBlock} />}
            DeleteTimeBlock={
              <DeleteTimeBlock id={timeBlock.id} title={timeBlock.title} />
            }
          />
        ))}

        {AddTimeBlock}
      </AnimatePresence>
    </section>
  );
};
