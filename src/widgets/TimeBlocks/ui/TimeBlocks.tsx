'use client';
import {
  deserializeTimeBlocks,
  ITimeBlock,
  TimeBlock,
} from '@/entities/TimeBlock';
import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { ControlTimeBlock } from '@/features/ControlTimeBlock';
import { DeleteTimeBlock } from '@/features/DeleteTimeBlock';
import { AnimatePresence } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/config';
import { timeBlocksSliceActions } from '../model/timeBlocksSlice';

interface TimeBlocksProps {
  AddTimeBlock: ReactNode;
  setTimeBlockToEdit: (timeBlock: ITimeBlock) => void;
}

export const TimeBlocks: FC<TimeBlocksProps> = ({
  AddTimeBlock,
  setTimeBlockToEdit,
}) => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  const userUid = useAppSelector((state) => state.userSliceReducer.user?.uid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userUid) return;

    const unsub = onSnapshot(doc(db, 'users', userUid), (doc) => {
      dispatch(
        timeBlocksSliceActions.initializeTimeBlocks(
          JSON.parse(doc.get('timeBlocks') ?? JSON.stringify([]))
        )
      );
    });

    return () => unsub();
  }, [userUid, dispatch]);

  return (
    <section className='w-full h-full flex flex-wrap justify-center items-start gap-10 overflow-y-auto no-scrollbar lg:justify-start'>
      <AnimatePresence mode='popLayout'>
        {timeBlocks.map((timeBlock) => (
          <TimeBlock
            key={timeBlock.id}
            timeBlock={timeBlock}
            setTimeBlockToEdit={setTimeBlockToEdit}
            ControlTimeBlock={<ControlTimeBlock timeBlock={timeBlock} />}
            DeleteTimeBlock={<DeleteTimeBlock timeBlockId={timeBlock.id} />}
          />
        ))}

        {AddTimeBlock}
      </AnimatePresence>
    </section>
  );
};
