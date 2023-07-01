import { msToHours, msToMinutes, msToSeconds } from '../../utils/msToTime';

let interval: any;

let progressPercent: number;
let seconds: string;
let minutes: string;
let hours: string;
let elapsed: number;

const startTimer = ({ data }: MessageEvent): void => {
  if (data.startTime !== null && data.isRunning === false) {
    interval = setInterval(() => {
      elapsed = Date.now() - data.startTime;

      progressPercent = (elapsed / (data.time * 1000)) * 100;
      seconds = msToSeconds(elapsed);
      minutes = msToMinutes(elapsed);
      hours = msToHours(elapsed);

      self.postMessage({
        elapsed,
        progressPercent,
        seconds,
        minutes,
        hours,
      });

      // console.log(elapsed);

      if (elapsed >= data.time * 1000) {
        clearInterval(interval);

        self.postMessage({
          elapsed: data.time * 1000,
          progressPercent: 100,
          seconds: msToSeconds(data.time * 1000),
          minutes: msToMinutes(data.time * 1000),
          hours: msToHours(data.time * 1000),
        });

        return;
      }
    }, 0);
  }
};

const pauseTimer = ({ data }: MessageEvent): void => {
  if (data.startTime === null && !data.reset) {
    clearInterval(interval);

    self.postMessage({
      elapsed,
      progressPercent,
      seconds,
      minutes,
      hours,
    });
  }
};

const resetTimer = ({ data }: MessageEvent): void => {
  if (data.startTime === null && data.reset === true) {
    clearInterval(interval);

    self.postMessage({
      elapsed: 0,
      progressPercent: 0,
      seconds: '00',
      minutes: '00',
      hours: '00',
    });
  }
};

self.addEventListener('message', startTimer);
self.addEventListener('message', pauseTimer);
self.addEventListener('message', resetTimer);
