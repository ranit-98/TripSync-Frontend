'use client';

import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useEffect, useRef, useState } from 'react';

type VoiceRecorderComposerProps = {
  onCancel: () => void;
  onSend: (file: File) => void;
};

const formatRecordingTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

export default function VoiceRecorderComposer({ onCancel, onSend }: VoiceRecorderComposerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [recordingState, setRecordingState] = useState<'starting' | 'recording' | 'stopping'>('starting');
  const onCancelRef = useRef(onCancel);
  const onSendRef = useRef(onSend);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const shouldSendRef = useRef(false);

  useEffect(() => {
    onCancelRef.current = onCancel;
    onSendRef.current = onSend;
  }, [onCancel, onSend]);

  useEffect(() => {
    let cancelled = false;

    const startRecording = async () => {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        onCancelRef.current();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        const recorder = new MediaRecorder(stream);
        streamRef.current = stream;
        mediaRecorderRef.current = recorder;
        recordedChunksRef.current = [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) recordedChunksRef.current.push(event.data);
        };
        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          setRecordingState('stopping');

          if (shouldSendRef.current && recordedChunksRef.current.length) {
            const blob = new Blob(recordedChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
            const file = new File([blob], `voice-note-${Date.now()}.webm`, { type: blob.type });
            onSendRef.current(file);
          } else {
            onCancelRef.current();
          }
        };

        recorder.start();
        setRecordingState('recording');
      } catch {
        onCancelRef.current();
      }
    };

    startRecording();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (recordingState !== 'recording') return undefined;

    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [recordingState]);

  const stopRecorder = (shouldSend: boolean) => {
    const recorder = mediaRecorderRef.current;
    shouldSendRef.current = shouldSend;
    setRecordingState('stopping');

    if (recorder?.state === 'recording') {
      recorder.stop();
    } else if (!shouldSend) {
      onCancelRef.current();
    }
  };

  return (
    <Box className="voice_recorder_composer">
      <Box className="voice_recording_status">
        <Box className="voice_recording_mic">
          <MicIcon fontSize="small" />
        </Box>
        <Box className="voice_waveform" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => (
            <span key={index} style={{ animationDelay: `${(index % 7) * 90}ms` }} />
          ))}
        </Box>
        <strong>{recordingState === 'starting' ? 'Starting...' : formatRecordingTime(elapsedSeconds)}</strong>
      </Box>
      <Box className="voice_recording_actions">
        <IconButton aria-label="Cancel voice note" onClick={() => stopRecorder(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Button
          aria-label="Send voice note"
          className="voice_recording_send"
          disabled={recordingState !== 'recording'}
          endIcon={<SendIcon fontSize="small" />}
          onClick={() => stopRecorder(true)}
        >
          Send voice
        </Button>
      </Box>
    </Box>
  );
}
