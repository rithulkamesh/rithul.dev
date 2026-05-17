'use client';

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from './audio-provider';

interface AudioPlayerProps {
  src: string;
  title: string;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const { 
    activeTrack, isPlaying: globalIsPlaying, currentTime: globalTime, 
    duration: globalDur, progress: globalProgress, analyser, 
    playTrack, togglePlayPause, seek 
  } = useAudio();

  const isThisTrack = activeTrack?.src === src;
  const isPlaying = isThisTrack && globalIsPlaying;
  
  const currentTime = isThisTrack ? globalTime : 0;
  const progress = isThisTrack ? globalProgress : 0;
  
  const [localDuration, setLocalDuration] = useState(0);
  const duration = isThisTrack && globalDur > 0 ? globalDur : localDuration;

  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reqRef = useRef<number>(0);

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyser || !isThisTrack) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      reqRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 22; 
      
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      const bars = 60;
      const step = (Math.PI * 2) / bars;
      const usefulBins = Math.floor(bufferLength * 0.6);
      
      for (let i = 0; i < bars; i++) {
        const symIndex = i < bars / 2 ? i : bars - i - 1;
        const dataIndex = Math.floor((symIndex / (bars / 2)) * usefulBins);
        
        const value = dataArray[dataIndex] / 255; 
        const barHeight = Math.pow(value, 2) * 16; 
        
        const lightness = 100 + Math.floor(value * 155);
        ctx.strokeStyle = `rgba(${lightness}, ${lightness}, ${lightness}, ${Math.max(0.1, value + 0.2)})`;
        
        const angle = i * step - Math.PI / 2 + (Date.now() / 2000); 
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        
        const direction = i % 2 === 0 ? 1 : (value > 0.5 ? -0.5 : 1);
        
        const x2 = centerX + Math.cos(angle) * (radius + (barHeight * direction));
        const y2 = centerY + Math.sin(angle) * (radius + (barHeight * direction));
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };
    
    draw();
  };

  useEffect(() => {
    if (isPlaying) {
      drawVisualizer();
    } else {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isPlaying, analyser, isThisTrack]);

  const handlePlayClick = () => {
    if (isThisTrack) {
      togglePlayPause();
    } else {
      playTrack({ src, title });
    }
  };

  const handleSeek = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isThisTrack || !trackRef.current || duration === 0) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    seek(percent * 100);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-5">
        <div className="relative flex items-center justify-center h-16 w-16">
          <canvas 
            ref={canvasRef}
            width={80}
            height={80}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
          
          <button
            onClick={handlePlayClick}
            className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100/5 hover:bg-zinc-100/10 text-zinc-300 transition-colors dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 dark:text-zinc-300 ring-1 ring-inset ring-zinc-700/50"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? "pause" : "play"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        <div className="flex-grow flex flex-col justify-center gap-1.5 min-w-0">
          <div className="flex w-full justify-between text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <div 
            ref={trackRef}
            className="relative h-2 w-full cursor-pointer rounded-full bg-zinc-800/50 group overflow-hidden"
            onMouseDown={handleSeek}
          >
            <div
              className="absolute left-0 top-0 h-full bg-zinc-400 dark:bg-zinc-500 rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Hidden local audio tag just for fetching duration when not actively playing */}
      {!isThisTrack && (
        <audio
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => setLocalDuration(e.currentTarget.duration)}
          className="hidden"
        />
      )}
    </div>
  );
}
