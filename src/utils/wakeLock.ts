export const isWakelogSupported = () => {
  if ('wakeLock' in navigator) {
    return true;
  } else {
    return false;
  }
};

let wakelock: WakeLockSentinel;
let wakeLockReleased = false;

const doWakeLock = async () => {
  if (!isWakelogSupported()) {
    return;
  }
  if (wakeLockReleased || !wakelock) {
    try {
      wakelock = await navigator.wakeLock.request();

      wakelock.addEventListener('release', () => {
        // console.log('Screen Wake State Locked:', !wakelock.released);
      });

      // console.log('Screen Wake State Locked:', !wakelock.released);

      wakeLockReleased = false;
    } catch (e: any) {
      // console.error('Failed to lock wake state with reason:', e.message);
    }
  }
};

export const releaseWakeLock = () => {
  if (wakelock && !wakeLockReleased) {
    wakelock.release();
    wakeLockReleased = true;
  }
};

export default doWakeLock;
