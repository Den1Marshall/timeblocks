let timeout = undefined;
let interval = undefined;

self.onmessage = (e) => {
  clearTimeout(timeout);
  clearInterval(interval);
  if (!e.data) return;

  timeout = setTimeout(() => {
    const diff = Date.now() - e.data.timerStartTime;

    self.postMessage(diff);

    interval = setInterval(() => {
      const diff = Date.now() - e.data.timerStartTime;

      self.postMessage(diff);
    }, 1000);
  }, e.data.timeoutWithServerLatency ?? 1000);
};
