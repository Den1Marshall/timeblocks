'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { FC, ReactNode, useMemo } from 'react';
import { ITimeBlock } from '../model/ITimeBlock';
import { TimeBlockBackground } from './TimeBlockBackground';
import { motion, Variants } from 'motion/react';
import { TrashIcon } from './TrashIcon';
import { EllipsisIcon } from './EllipsisIcon';
import { SettingsIcon } from '@/shared/ui';
import { timeToMs } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { useTimeBlockElapsed } from '../lib/useTimeBlockElapsed';

interface TimeBlockProps {
  timeBlock: ITimeBlock;
  ControlTimeBlock: ReactNode;
  DeleteTimeBlock: ReactNode;
}

export const TimeBlock: FC<TimeBlockProps> = ({
  ControlTimeBlock,
  DeleteTimeBlock,
  timeBlock,
}) => {
  const dispatch = useAppDispatch();
  const timeBlocks = useAppSelector(
    (state) => state.timeBlocksSliceReducer.timeBlocks
  );

  const {
    title,
    startTime,
    endTime,
    duration,
    elapsed,
    timerStartTime,
    color,
  } = timeBlock;

  const timeBlockElapsed = useTimeBlockElapsed(timerStartTime, elapsed);

  const elapsedInMs = timeToMs(timeBlockElapsed);
  const durationInMs = timeToMs(duration);

  const completionPercentage = (elapsedInMs / durationInMs) * 100;

  const variants: Variants = {
    enter: {
      transform: 'translateY(0%)',
      opacity: 1,
    },

    exit: {
      transform: 'translateY(-100%)',
      opacity: 0,
    },
  };

  const disabledTimeBlockActions = useMemo(() => {
    if (timeBlocks.find((timeBlock) => timeBlock.timerStartTime !== null))
      return ['edit'];
  }, [timeBlocks]);

  const handleEditTimeBlock = () =>
    dispatch(
      timeBlocksSliceActions.setTimeBlockToEdit(
        JSON.parse(JSON.stringify(timeBlock))
      )
    );

  // TODO: <400px styles
  return (
    <motion.article
      layout
      variants={variants}
      initial='exit'
      animate='enter'
      exit='exit'
      className='w-full max-w-96 aspect-video'
    >
      <Card isFooterBlurred isBlurred className='w-full h-full'>
        <CardHeader className='max-[420px]:text-2xl justify-center text-3xl text-center'>
          <span className='overflow-hidden text-ellipsis'>{title}</span>

          <Dropdown backdrop='blur'>
            <DropdownTrigger>
              <Button
                variant='light'
                isIconOnly
                aria-label='Open TimeBlock actions dropdown'
                className='absolute top-0 right-1'
              >
                <EllipsisIcon />
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              disabledKeys={disabledTimeBlockActions}
              aria-label='TimeBlock actions'
            >
              <DropdownItem
                showDivider
                key='edit'
                startContent={<SettingsIcon />}
                onPress={handleEditTimeBlock}
                description={
                  disabledTimeBlockActions
                    ? 'Stop the TimeBlock to edit'
                    : undefined
                }
              >
                Edit TimeBlock
              </DropdownItem>

              <DropdownItem
                key='delete'
                color='danger'
                startContent={<TrashIcon />}
                className='text-danger'
              >
                {DeleteTimeBlock}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        <CardBody className='z-10 items-center justify-center'>
          <div className='flex flex-col gap-2'>
            <p className='max-[420px]:text-sm'>
              {timeBlockElapsed.toString()} / {duration.toString()}
            </p>
            <p className='max-[420px]:text-xs flex items-center justify-center text-sm opacity-50'>
              {startTime.toString().slice(0, 5)}-
              {endTime.toString().slice(0, 5)}
            </p>
          </div>
        </CardBody>

        <TimeBlockBackground
          completionPercentage={completionPercentage}
          color={color}
        />

        <CardFooter className='justify-center gap-2'>
          {ControlTimeBlock}
        </CardFooter>
      </Card>
    </motion.article>
  );
};
