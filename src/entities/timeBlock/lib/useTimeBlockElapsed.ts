'use client';

import { msToTime, timeToMs } from '@/shared/lib';
import { TimeBlock } from '../model/timeBlock';
import { useEffect, useRef, useState } from 'react';

export const useTimeBlockElapsed = (
  timerStartTime: TimeBlock['timerStartTime'],
  elapsed: TimeBlock['elapsed']
) => {
  const initialTimeBlockElapsed = timerStartTime
    ? msToTime(timeToMs(elapsed) + (Date.now() - timerStartTime))
    : elapsed;

  const [timeBlockElapsed, setTimeBlockElapsed] = useState(
    initialTimeBlockElapsed
  );

  const previousElapsedMs = timeToMs(elapsed);
  const lastSecondRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;

    const updateElapsed = () => {
      if (timerStartTime === null) return;

      const now = Date.now();
      const diff = now - timerStartTime;

      const totalElapsedMs = previousElapsedMs + diff;
      const secondsElapsed = Math.floor(totalElapsedMs / 1000);

      if (secondsElapsed !== lastSecondRef.current) {
        lastSecondRef.current = secondsElapsed;
        setTimeBlockElapsed(msToTime(totalElapsedMs).set({ millisecond: 0 }));
      }

      rafId = requestAnimationFrame(updateElapsed);
    };

    rafId = requestAnimationFrame(updateElapsed);

    return () => cancelAnimationFrame(rafId);
  }, [timerStartTime, previousElapsedMs]);

  useEffect(() => {
    setTimeBlockElapsed(elapsed);
  }, [elapsed]);

  return timeBlockElapsed;
};
