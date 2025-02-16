'use client';

import { FC, useEffect } from 'react';
import { Switch } from '@heroui/react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';
import { useToast } from '@/shared/lib';

export const NotificationsSwitch: FC = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useLocalStorage(
    'isNotificationsEnabled',
    false,
    {
      initializeWithValue: false,
    }
  );
  const toast = useToast();

  const handleValueChange = async (isSelected: boolean) => {
    if (!('Notification' in window)) {
      toast({
        title: 'Your browser does not support notifications.',
        color: 'warning',
      });

      return;
    }

    if (Notification.permission === 'denied') {
      toast({
        title:
          'Notifications are blocked. Please open your browser preferences or click the lock near the address bar to change your notification preferences.',
        color: 'warning',
      });

      return;
    }

    if (isSelected) {
      const notificationPermission = await Notification.requestPermission();

      if (notificationPermission === 'granted') {
        setIsNotificationsEnabled(true);
      }
    } else {
      setIsNotificationsEnabled(false);
    }
  };

  useEffect(() => {
    if (!('Notification' in window)) return;

    setIsNotificationsEnabled(Notification.permission === 'granted');
  }, [setIsNotificationsEnabled]);

  const isClient = useIsClient();
  if (!isClient) return null;

  return (
    <Switch
      aria-label='Notifications'
      isSelected={isNotificationsEnabled}
      onValueChange={handleValueChange}
    />
  );
};
