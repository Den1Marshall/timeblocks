export const isWakelogSupported = () => {
  if ('wakeLock' in navigator) {
    return true;
  } else {
    return false;
  }
};

let wakelock: WakeLockSentinel;

const lockOnPageAgainVisible = async () => {
  if (wakelock !== null && document.visibilityState === 'visible') {
    wakelock = await navigator.wakeLock.request('screen');
    // console.log('WakeLock released: ', wakelock.released);
  }
};

const doWakeLock = async () => {
  if (!isWakelogSupported()) {
    return;
  }
  try {
    wakelock = await navigator.wakeLock.request();

    document.addEventListener('visibilitychange', lockOnPageAgainVisible);

    wakelock.addEventListener('release', () => {
      // console.log('WakeLock released: ', wakelock.released);
    });

    // console.log('WakeLock released: ', wakelock.released);
  } catch (e: unknown) {
    // console.error('Failed to lock wake state with reason:', e.message);
  }
};

export const releaseWakeLock = () => {
  if (wakelock) {
    wakelock.release();
    // console.log('WakeLock released: ', wakelock.released);
  }
};

export default doWakeLock;
