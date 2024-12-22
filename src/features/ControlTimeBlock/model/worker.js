let interval = undefined;

self.onmessage = (e) => {
  clearInterval(interval);
  if (!e.data) return;

  let lastSecond = 0;

  interval = setInterval(() => {
    const diff = Date.now() - e.data.timerStartTime;
    const second = Math.floor((Date.now() - e.data.timerStartTime) / 1000);

    if (second > lastSecond) {
      lastSecond = second;
      postMessage(diff);
    }
  }, 10);
};
