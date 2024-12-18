'use client';
import { ITimeBlock } from '@/entities/TimeBlock';
import {
  Button,
  commonColors,
  Divider,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  TimeInput,
} from '@nextui-org/react';
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ArrowIcon } from './ArrowIcon';
import { Time } from '@internationalized/date';
import { SettingsIcon } from './SettingsIcon';
import { FirebaseError } from 'firebase/app';
import { useAppSelector } from '@/app/redux';
import { msToTime } from '@/shared/lib';
import { ColorPicker } from '@/shared/ui';
import { v4 as uuidv4 } from 'uuid';
import { calculateDuration } from '../lib/calculateDuration';
import { ClockIcon } from './ClockIcon';
import { DurationTabs } from './DurationTabs';

interface SetupTimeBlockProps {
  label: string;
  timeBlockToEdit: ITimeBlock | null;
  onConfigured: (timeBlock: ITimeBlock, userUid: string) => Promise<void>;
}

interface FormData {
  title: string;
  startTime: Time;
  endTime: Time;
  color: string;
}

// TODO: refactor code
export const SetupTimeBlock: FC<SetupTimeBlockProps> = ({
  label,
  timeBlockToEdit,
  onConfigured,
}) => {
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);
  const timeBlockToEditElapsed = useAppSelector(
    (state) =>
      state.timeBlocksSliceReducer.timeBlocks.find(
        (timeBlock) => timeBlock.id === timeBlockToEdit?.id
      )?.elapsed
  );

  const now = new Date();

  let nowTime = new Time(now.getHours(), now.getMinutes(), now.getSeconds());
  nowTime = nowTime.set({
    minute: (Math.round(nowTime.minute / 15) * 15) % 60,
  });

  const roundedMinutes = Math.round(nowTime.minute / 15) * 15;
  let newHours = nowTime.hour;
  let newMinutes = roundedMinutes;

  if (roundedMinutes >= 60) {
    newHours = (nowTime.hour + 1) % 24;
    newMinutes = 0;
  }

  nowTime = nowTime.set({ hour: newHours, minute: newMinutes });

  const maxTime = new Time(23, 59, 0, 0);
  const nowEndTime = nowTime.add({ minutes: 15 });

  const adjustedEndTime =
    nowEndTime.compare(maxTime) > 0 ? maxTime : nowEndTime;

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: timeBlockToEdit?.title,
      startTime: timeBlockToEdit?.startTime ?? nowTime,
      endTime: timeBlockToEdit?.endTime ?? adjustedEndTime,
      color: timeBlockToEdit?.color,
    },
    shouldUnregister: true,
  });

  const setColor = (color: string) => setValue('color', color);
  const color = watch('color', commonColors.blue[500]);
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const setEndTime = (endTime: Time) => setValue('endTime', endTime);

  useEffect(() => {
    if (timeBlockToEdit) {
      setColor(timeBlockToEdit.color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeBlockToEdit]);

  const onSubmit: SubmitHandler<FormData> = async ({
    title,
    startTime,
    endTime,
  }) => {
    const millisecondsDiff = endTime.compare(startTime);

    const { hour, minute, second, millisecond } = msToTime(millisecondsDiff);
    const duration = new Time(hour, minute, second, millisecond);
    const timeBlock: ITimeBlock = timeBlockToEdit
      ? {
          ...timeBlockToEdit,
          title,
          startTime,
          endTime,
          duration,
          elapsed: timeBlockToEditElapsed ?? timeBlockToEdit.elapsed,
          color,
        }
      : {
          id: uuidv4(),
          title: title.trim(),
          startTime,
          endTime,
          duration,
          elapsed: new Time(0, 0, 0, 0),
          timerStartTime: null,
          color,
        };

    try {
      await onConfigured(timeBlock, userUid);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError('root', { type: 'custom', message: error.code });
      } else {
        setError('root', { type: 'custom', message: 'Something went wrong' });
      }
    }
  };

  return (
    <DrawerContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerHeader className='justify-center items-center gap-2'>
          Setup your TimeBlock <SettingsIcon />
        </DrawerHeader>

        <DrawerBody>
          <Controller
            control={control}
            name='title'
            rules={{
              required: 'Title is required',
              maxLength: {
                value: 100,
                message: 'Maximum title length is 100',
              },
            }}
            render={({ field }) => (
              <Input
                placeholder='My TimeBlock'
                isClearable
                onClear={() => setValue('title', '')}
                isInvalid={errors.title?.message !== undefined}
                errorMessage={errors.title?.message}
                {...field}
              />
            )}
          />

          <div className='flex items-center'>
            <Controller
              control={control}
              name='startTime'
              rules={{
                required: 'Start time is required',
              }}
              render={({ field }) => (
                <TimeInput
                  hourCycle={24}
                  maxValue={new Time(23, 58, 0, 0)}
                  label='Start time'
                  isInvalid={errors.startTime?.type !== undefined}
                  errorMessage={errors.startTime?.message}
                  startContent={<ClockIcon />}
                  className='w-full'
                  {...field}
                />
              )}
            />

            <ArrowIcon />

            <Controller
              control={control}
              name='endTime'
              rules={{
                required: 'End time is required',
                validate: (endTime) => {
                  if (startTime) {
                    return endTime.compare(startTime) > 0
                      ? true
                      : 'Must be later';
                  } else {
                    return false;
                  }
                },
              }}
              render={({ field }) => (
                <TimeInput
                  hourCycle={24}
                  minValue={new Time(0, 1, 0, 0)}
                  maxValue={new Time(23, 59, 0, 0)}
                  label='End time'
                  isInvalid={errors.endTime?.message !== undefined}
                  errorMessage={errors.endTime?.message}
                  startContent={<ClockIcon />}
                  className='w-full'
                  {...field}
                />
              )}
            />
          </div>

          <p className='text-center'>
            Duration: {calculateDuration(startTime, endTime)}
          </p>

          <DurationTabs
            maxTime={maxTime}
            startTime={startTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />

          <Divider />

          <ColorPicker
            color={color}
            setColor={setColor}
            label='Background color'
            ariaLabel='Select TimeBlock background color'
          />
        </DrawerBody>

        <DrawerFooter>
          <Button type='submit' fullWidth color='primary'>
            {label}
          </Button>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};
