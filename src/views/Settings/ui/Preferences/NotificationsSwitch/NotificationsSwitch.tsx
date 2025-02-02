'use client';

import { FC, useEffect } from 'react';
import { Switch } from '@heroui/react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';

export const NotificationsSwitch: FC = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useLocalStorage(
    'isNotificationsEnabled',
    false,
    {
      initializeWithValue: false,
    }
  );

  const handleValueChange = async (isSelected: boolean) => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }

    if (Notification.permission === 'denied') {
      alert(
        'Notifications are blocked. Please open your browser preferences or click the lock near the address bar to change your notification preferences.'
      );
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
