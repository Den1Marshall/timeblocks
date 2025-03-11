'use client';

import {
  getLocalTimeZone,
  now as internationalizedNow,
  ZonedDateTime,
} from '@internationalized/date';
import { useEffect, useState } from 'react';

export const useNow = (): ZonedDateTime => {
  const [now, setNow] = useState<ZonedDateTime>(
    internationalizedNow(getLocalTimeZone()).set({ millisecond: 0 })
  );

  useEffect(() => {
    let rafId: number;

    const updateNow = () => {
      const newNow = internationalizedNow(getLocalTimeZone());

      if (newNow.compare(now) >= 1000) {
        setNow(newNow.set({ millisecond: 0 }));
      }

      rafId = requestAnimationFrame(updateNow);
    };

    rafId = requestAnimationFrame(updateNow);

    return () => cancelAnimationFrame(rafId);
  }, [now]);

  return now;
};
