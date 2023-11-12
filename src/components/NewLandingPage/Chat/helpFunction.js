//retraso de eventos
export const Delay = function (ms) {
  let timer = 0;

  return function (callback) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
};
