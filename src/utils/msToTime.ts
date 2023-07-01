export const msToTime = (ms: number) => {
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');

  const minutes = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, '0');

  const hours = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const msToSeconds = (ms: number) => {
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');

  return seconds;
};

export const msToMinutes = (ms: number) => {
  const minutes = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, '0');

  return minutes;
};

export const msToHours = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, '0');

  return hours;
};
