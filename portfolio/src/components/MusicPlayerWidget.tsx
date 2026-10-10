'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

const tracks = [
  { title: 'RED', artist: 'Seedhe Maut', url: '/assets/music/RED - Seedhe Maut.mp3' },
  { title: 'After Hours', artist: 'The Weeknd', url: '/assets/music/After Hours - Weeknd.mp3' },
  { title: 'Flashing Lights', artist: 'Kanye West', url: '/assets/music/Flashing Lights.mp3' },
  { title: 'Runaway', artist: 'Kanye West', url: '/assets/music/Runaway - Kanye West.mp3' },
  { title: 'Sunflower', artist: 'Post Malone & Swae Lee', url: '/assets/music/Sunflower.mp3' },
  { title: 'The Less I Know The Better', artist: 'Tame Impala', url: '/assets/music/Tame Impala - The Less I Know The Better.mp3' },
];

export default function MusicPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNext = useCallback(() => {
    setTrackIndex((prev) => {
      const nextIdx = (prev + 1) % tracks.length;
      if (audioRef.current) {
        audioRef.current.src = tracks[nextIdx].url;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
      return nextIdx;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setTrackIndex((prev) => {
      const prevIdx = (prev - 1 + tracks.length) % tracks.length;
      if (audioRef.current) {
        audioRef.current.src = tracks[prevIdx].url;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
      return prevIdx;
    });
  }, []);

  useEffect(() => {
    const audio = new Audio(tracks[0].url);
    audio.loop = false;
    audioRef.current = audio;

    const onEnded = () => {
      handleNext();
    };

    audio.addEventListener('ended', onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener('ended', onEnded);
    };
  }, [handleNext]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play request interrupted or prevented:', err);
      });
    }
  };

  const currentTrack = tracks[trackIndex] || tracks[0];

  return (
    <div className={`music-player-widget ${isPlaying ? 'playing' : ''}`}>
      <div className="music-vinyl-container">
        <div className="vinyl-record">
          <div className="vinyl-label" />
          <div className="vinyl-hole" />
        </div>
        <div className="tonearm">
          <div className="tonearm-pivot" />
          <div className="tonearm-arm" />
          <div className="tonearm-head" />
        </div>
      </div>

      <div className="music-info">
        <div className="music-title">{currentTrack.title}</div>
        <div className="music-artist">{currentTrack.artist}</div>

        <div className="music-controls">
          {/* Previous */}
          <svg
            className="control-icon"
            viewBox="0 0 24 24"
            onClick={handlePrev}
            role="button"
            tabIndex={0}
            aria-label="Previous track"
          >
            <path d="M19 20L9 12l10-8v16zM5 19h2V5H5v14z" />
          </svg>

          {/* Play / Pause */}
          <svg
            className="control-icon play-icon"
            viewBox="0 0 24 24"
            onClick={togglePlay}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>

          {/* Next */}
          <svg
            className="control-icon"
            viewBox="0 0 24 24"
            onClick={handleNext}
            role="button"
            tabIndex={0}
            aria-label="Next track"
          >
            <path d="M5 4l10 8-10 8V4zm14 1v14h-2V5h2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

