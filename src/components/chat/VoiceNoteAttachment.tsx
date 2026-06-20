'use client';

import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useRef, useState } from 'react';

type VoiceNoteAttachmentProps = {
  name?: string;
  url: string;
};

const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

export default function VoiceNoteAttachment({ name = 'Voice note', url }: VoiceNoteAttachmentProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const nextTime = (Number(value) / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolume = (value: string) => {
    const nextVolume = Number(value);
    setVolume(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume;
  };

  return (
    <Box className="voice_note_attachment">
      <audio
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        preload="metadata"
        ref={audioRef}
        src={url}
      />
      <Box className="voice_note_icon">
        <MicIcon fontSize="small" />
      </Box>
      <Box className="voice_note_body">
        <strong>{name}</strong>
        <Box className="voice_note_controls">
          <button aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'} onClick={togglePlayback} type="button">
            {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
          </button>
          <input
            aria-label="Voice note progress"
            max="100"
            min="0"
            onChange={(event) => handleSeek(event.target.value)}
            style={{ backgroundSize: `${progress}% 100%` }}
            type="range"
            value={progress}
          />
          <span>{formatDuration(currentTime)}</span>
          <Box className={`voice_note_volume${showVolume ? ' open' : ''}`}>
            <IconButton aria-label="Volume" onClick={() => setShowVolume((value) => !value)}>
              <VolumeUpIcon fontSize="small" />
            </IconButton>
            <Box className="voice_volume_panel">
              <input
                aria-label="Voice note volume"
                max="1"
                min="0"
                onChange={(event) => handleVolume(event.target.value)}
                step="0.05"
                type="range"
                value={volume}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
