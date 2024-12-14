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
} from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import { ITimeBlock } from '../model/ITimeBlock';
import { TimeBlockBackground } from './TimeBlockBackground';
import { motion } from 'motion/react';
import { TrashIcon } from './TrashIcon';
import { EllipsisIcon } from './EllipsisIcon';
import { SettingsIcon } from '@/shared/ui';
import { variants } from './variants';
import { timeToMs } from '@/shared/lib';

interface TimeBlockProps {
  timeBlock: ITimeBlock;
  ControlTimeBlock: ReactNode;
  DeleteTimeBlock: ReactNode;
  setTimeBlockToEdit: (timeBlock: ITimeBlock) => void;
}

export const TimeBlock: FC<TimeBlockProps> = ({
  ControlTimeBlock,
  DeleteTimeBlock,
  timeBlock,
  setTimeBlockToEdit,
}) => {
  const { title, startTime, endTime, duration, elapsed, color } = timeBlock;

  const elapsedInMs = timeToMs(elapsed);
  const durationInMs = timeToMs(duration);

  const completionPercentage = (elapsedInMs / durationInMs) * 100;

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

            <DropdownMenu aria-label='TimeBlock actions'>
              <DropdownItem
                showDivider
                key='edit'
                startContent={<SettingsIcon />}
                onPress={() => setTimeBlockToEdit(timeBlock)}
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

        <CardBody className='items-center justify-center'>
          <div className='flex flex-col gap-2'>
            <p className='max-[420px]:text-sm'>
              {elapsed.toString()} / {duration.toString()}
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
