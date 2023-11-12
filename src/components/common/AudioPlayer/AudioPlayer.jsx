import React from 'react';
import Bar from './Bar';
import useAudioPlayer from './useAudioPlayer';
import CrystalButton from '../CrystalButton';
import './styles.scss';
import { ReactComponent as PlayIcon } from './assets/play.svg';
import { ReactComponent as PauseIcon } from './assets/pause.svg';
import { ReactComponent as StopIcon } from './assets/stop.svg';
import { ReactComponent as VolumeIcon } from './assets/volume-speaker.svg';

function AudioPlayer({ audioSrc, colorScheme, fullWidth, usePlayerColor }) {
  const { curTime, duration, playing, setPlaying, setClickedTime, stop } =
    useAudioPlayer(audioSrc);

  const fullWidthSnippet = {
    width: fullWidth ? '100%' : 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

  return (
    <div className="player" style={fullWidth ? fullWidthSnippet : null}>
      <audio id={audioSrc}>
        <source src={audioSrc} />
        Your browser does not support the audio element.
      </audio>
      <div
        className="controls"
        style={{
          color: usePlayerColor
            ? 'var(--player-color)'
            : colorScheme === 'dark'
            ? '#61fb69'
            : '#000000',
          ...fullWidthSnippet
        }}
      >
        <CrystalButton type="button" onClick={stop} className="mr-3 p-0 stop-icon">
          <StopIcon aria-label="stop audio" />
        </CrystalButton>
        {playing ? (
          <CrystalButton
            className="mr-3 p-0 play-icon"
            type="button"
            onClick={() => {
              setPlaying(false);
            }}
          >
            <PauseIcon aria-label="pause audio" />
          </CrystalButton>
        ) : (
          <CrystalButton
            className="mr-3 p-0 play-icon"
            type="button"
            onClick={() => {
              setPlaying(true);
            }}
          >
            <PlayIcon aria-label="play audio" />
          </CrystalButton>
        )}
        <Bar
          curTime={curTime}
          duration={duration}
          colorScheme={colorScheme}
          usePlayerColor={usePlayerColor}
          onTimeUpdate={time => setClickedTime(time)}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
