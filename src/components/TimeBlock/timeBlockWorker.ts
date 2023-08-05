interface WorkerMessage {
  startTime: number | null;
  isRunning: boolean;
  duration: number;
}

let interval: number;

let progressPercent: number;
let elapsed: number;

const startTimer = ({ data }: MessageEvent<WorkerMessage>): void => {
  const { startTime, isRunning, duration } = data;

  if (startTime !== null && isRunning === false) {
    interval = setInterval(() => {
      elapsed = Date.now() - startTime;

      progressPercent = (elapsed / duration) * 100;

      self.postMessage({
        elapsed,
        progressPercent,
      });

      // console.log(elapsed);

      if (elapsed >= duration) {
        clearInterval(interval);

        self.postMessage({
          elapsed: duration,
          progressPercent: 100,
        });

        return;
      }
    }, 0);
  }
};

const pauseTimer = ({
  data,
}: MessageEvent<{ startTime: number | null; reset: boolean }>): void => {
  const { startTime, reset } = data;
  if (startTime === null && !reset) {
    clearInterval(interval);

    self.postMessage({
      elapsed,
      progressPercent,
    });
  }
};

const resetTimer = ({
  data,
}: MessageEvent<{ startTime: number | null; reset: boolean }>): void => {
  const { startTime, reset } = data;
  if (startTime === null && reset === true) {
    clearInterval(interval);

    self.postMessage({
      elapsed: 0,
      progressPercent: 0,
    });
  }
};

self.addEventListener('message', startTimer);
self.addEventListener('message', pauseTimer);
self.addEventListener('message', resetTimer);
