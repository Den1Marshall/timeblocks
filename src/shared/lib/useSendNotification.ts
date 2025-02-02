'use client';

import { useLocalStorage } from 'usehooks-ts';

// TODO: implement toast for notifications when user in-app

export const useSendNotification = () => {
  const [isNotificationsEnabled] = useLocalStorage(
    'isNotificationsEnabled',
    false,
    {
      initializeWithValue: false,
    }
  );

  const sendNotification = (
    title: string,
    options?: NotificationOptions
  ): Notification | void => {
    if (!isNotificationsEnabled || document.visibilityState === 'visible')
      return;

    new Notification('TimeBlocks', {
      body: title,
      icon: '/icon-512.png',
      ...options,
    });
  };

  return sendNotification;
};
