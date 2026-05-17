'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrackInfo {
  src: string;
  title: string;
}

interface AudioContextType {
  activeTrack: TrackInfo | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  analyser: AnalyserNode | null;
  playTrack: (track: TrackInfo) => void;
  togglePlayPause: () => void;
  seek: (percent: number) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [activeTrack, setActiveTrack] = useState<TrackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analyserReady, setAnalyserReady] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const setupAudio = () => {
    if (!audioRef.current) return;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      audioCtxRef.current = new AudioCtx();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 128; // 64 bins
      
      sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
      setAnalyserReady(true);
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTrack = (track: TrackInfo) => {
    if (activeTrack?.src === track.src) {
      togglePlayPause();
      return;
    }
    
    setActiveTrack(track);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    
    // Slight delay to allow React to update the <audio src> before calling play
    setTimeout(() => {
      setupAudio();
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }, 50);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !activeTrack) return;
    setupAudio();
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio playback failed:", e));
    }
  };

  const seek = (percent: number) => {
    if (!audioRef.current || duration === 0) return;
    const newTime = (percent / 100) * duration;
    setCurrentTime(newTime);
    setProgress(percent);
    audioRef.current.currentTime = newTime;
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setActiveTrack(null);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(current);
    if (dur > 0) {
      setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <AudioContext.Provider value={{
      activeTrack, isPlaying, currentTime, duration, progress, 
      analyser: analyserReady ? analyserRef.current : null,
      playTrack, togglePlayPause, seek, closePlayer
    }}>
      {children}
      
      <audio
        ref={audioRef}
        src={activeTrack?.src}
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />

      {/* Persistent Floating Global Player */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-4 rounded-full border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 shadow-2xl backdrop-blur-md"
          >
            <button
              onClick={togglePlayPause}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>
            
            <div className="flex flex-col pr-2">
              <span className="max-w-[150px] truncate text-xs font-bold text-zinc-100 sm:max-w-[200px]">
                {activeTrack.title}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <button
              onClick={closePlayer}
              className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AudioContext.Provider>
  );
}
