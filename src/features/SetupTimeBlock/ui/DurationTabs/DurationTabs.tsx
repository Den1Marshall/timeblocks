'use client';

import { Tab, Tabs } from '@heroui/react';
import { FC, useMemo } from 'react';
import { Time } from '@internationalized/date';
import { defaultTransition } from '@/shared/ui';

interface DurationTabsProps {
  maxTime: Time;
  startTime: Time;
  endTime: Time;
  setEndTime: (endTime: Time) => void;
}

export const DurationTabs: FC<DurationTabsProps> = ({
  maxTime,
  startTime,
  endTime,
  setEndTime,
}) => {
  const durations = useMemo(() => [15, 30, 60, 120], []);

  const isDurationDisabled = (duration: number): boolean => {
    if (!startTime) return true;

    const newEndTime = startTime.add({ minutes: duration });

    return newEndTime.hour < startTime.hour || newEndTime.compare(maxTime) > 0;
  };

  const disabledDurations = useMemo(
    () =>
      durations.filter((duration) => isDurationDisabled(duration)).map(String),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [durations, startTime]
  );

  const selectedDuration = useMemo(() => {
    if (!startTime || !endTime) return 'custom';

    const matchingDuration = durations.find(
      (duration) => startTime.add({ minutes: duration }).compare(endTime) === 0
    );

    return matchingDuration ? String(matchingDuration) : 'custom';
  }, [durations, startTime, endTime]);

  return (
    <Tabs
      aria-label='Duration selector'
      disabledKeys={disabledDurations}
      selectedKey={selectedDuration}
      onSelectionChange={(selectionDuration) => {
        setEndTime(startTime.add({ ...endTime, minutes: +selectionDuration }));
      }}
      fullWidth
      motionProps={{
        transition: {
          ...defaultTransition,
          bounce: 0.2,
        },
      }}
    >
      {durations.map((duration) => (
        <Tab key={duration} title={`${duration}m`} />
      ))}
      <Tab isDisabled key={'custom'} title='Custom' className='!opacity-100' />
    </Tabs>
  );
};
