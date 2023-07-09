import icon from '../assets/icons/logo.svg';

const isNotifAvail = (): boolean => {
  if (!('Notification' in window)) {
    return false;
  } else {
    return true;
  }
};

export const accessNotif = (): void => {
  if (isNotifAvail()) {
    Notification.requestPermission();
  }
};

const sendNotif = (taskName: string) => {
  const notifTitle = 'Done ✅';

  const notifOptions: NotificationOptions = {
    icon: icon,
    body: `${taskName} task is done`,
    requireInteraction: true,
    badge: icon,
  };

  if (!isNotifAvail()) {
    return;
  } else if (Notification.permission === 'granted') {
    new Notification(notifTitle, notifOptions);
  } else if (Notification.permission === 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(notifTitle, notifOptions);
      }
    });
  }
};

export default sendNotif;
