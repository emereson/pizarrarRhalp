export const playSound = (audioFile, cicle = false, stop = false) => {
  if (stop) {
    audioFile.pause();
    audioFile.currentTime = 0;
  } else {
    audioFile.loop = cicle;
    audioFile.play();
  }
};
