'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Track } from '@/types';

const defaultTracks: Track[] = [
  {
    id: 1,
    title: 'After Hours',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '06:01',
    url: '/assets/music/After Hours - Weeknd.mp3',
  },
  {
    id: 2,
    title: 'Flashing Lights',
    artist: 'Kanye West',
    album: 'Graduation',
    duration: '03:57',
    url: '/assets/music/Flashing Lights.mp3',
  },
  {
    id: 3,
    title: 'RED',
    artist: 'Seedhe Maut',
    album: 'Nayaab',
    duration: '03:13',
    url: '/assets/music/RED - Seedhe Maut.mp3',
  },
  {
    id: 4,
    title: 'Runaway',
    artist: 'Kanye West',
    album: 'My Beautiful Dark Twisted Fantasy',
    duration: '09:08',
    url: '/assets/music/Runaway - Kanye West.mp3',
  },
  {
    id: 5,
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    album: 'Spider-Man: Into the Spider-Verse',
    duration: '02:38',
    url: '/assets/music/Sunflower.mp3',
  },
  {
    id: 6,
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    album: 'Currents',
    duration: '03:36',
    url: '/assets/music/Tame Impala - The Less I Know The Better.mp3',
  },
];

export default function AppleMusicApp() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('Playlists');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handleLoadedMetadata = () => {
      const durationSecs = audio.duration;
      if (!isNaN(durationSecs) && currentTrackIndex >= 0) {
        const mins = Math.floor(durationSecs / 60);
        const secs = Math.floor(durationSecs % 60);
        const durStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        setTracks((prev) =>
          prev.map((t, i) => (i === currentTrackIndex ? { ...t, duration: durStr } : t))
        );
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [tracks.length, currentTrackIndex]);

  const playTrack = (index: number) => {
    if (!audioRef.current) return;
    if (currentTrackIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentTrackIndex(index);
    audioRef.current.src = tracks[index].url;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn('Playback error:', err));
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        audioRef.current.src = currentTrack.url;
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Playback error:', err));
    }
  };

  const playNext = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIdx);
  };

  const playPrev = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIdx);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: '#1c1c1e',
        color: '#ffffff',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Main Area */}
      <div className="apple-music-main" style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div
          style={{
            width: '220px',
            background: 'rgba(30, 30, 32, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '20px 0',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          className="hide-on-mobile"
        >
          {/* Section: Apple Music */}
          <div style={{ padding: '0 16px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#8e8e93',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Apple Music
            </div>
            {[
              {
                name: 'Listen Now',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                ),
              },
              {
                name: 'Browse',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                ),
              },
              {
                name: 'Radio',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                  </svg>
                ),
              },
            ].map((tab) => (
              <div
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginBottom: '2px',
                  background: activeTab === tab.name ? 'rgba(250, 36, 60, 0.15)' : 'transparent',
                  color: activeTab === tab.name ? '#fa243c' : '#fff',
                  fontWeight: activeTab === tab.name ? 600 : 400,
                }}
              >
                <div style={{ marginRight: '10px', display: 'flex' }}>{tab.icon}</div>
                <span>{tab.name}</span>
              </div>
            ))}
          </div>

          {/* Section: Library */}
          <div style={{ padding: '0 16px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#8e8e93',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Library
            </div>
            {[
              {
                name: 'Songs',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                ),
              },
              {
                name: 'Playlists',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
            ].map((tab) => (
              <div
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginBottom: '2px',
                  background: activeTab === tab.name ? 'rgba(250, 36, 60, 0.15)' : 'transparent',
                  color: activeTab === tab.name ? '#fa243c' : '#fff',
                  fontWeight: activeTab === tab.name ? 600 : 400,
                }}
              >
                <div style={{ marginRight: '10px', display: 'flex' }}>{tab.icon}</div>
                <span>{tab.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="apple-music-content" style={{ flex: 1, overflowY: 'auto', padding: '30px 30px 24px', background: '#1c1c1e' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', margin: '0 0 6px 0', fontWeight: 700 }}>Coding Focus</h1>
            <p style={{ color: '#8e8e93', margin: 0, fontSize: '14px' }}>
              Deep focus tracks to get you in the zone. Updated today.
            </p>
          </div>

          {/* Track List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {tracks.map((track, idx) => {
              const isThisPlaying = currentTrackIndex === idx && isPlaying;
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: currentTrackIndex === idx ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <div style={{ width: '30px', textAlign: 'center', fontSize: '13px', color: '#8e8e93', marginRight: '12px' }}>
                    {isThisPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fa243c">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: currentTrackIndex === idx ? '#fa243c' : '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {track.title}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#8e8e93',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {track.artist}
                    </span>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      fontSize: '13px',
                      color: '#8e8e93',
                      display: 'flex',
                      padding: '0 12px',
                    }}
                    className="hide-on-mobile"
                  >
                    {track.album}
                  </div>

                  <div style={{ fontSize: '13px', color: '#8e8e93', paddingLeft: '12px' }}>
                    {track.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Player Bar */}
      <div
        className="apple-music-player-bar"
        style={{
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(30, 30, 32, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0 30px',
          flexShrink: 0,
        }}
      >
        <div className="apple-music-track-info" style={{ width: '220px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#ffffff',
            }}
          >
            {currentTrack.title}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#8e8e93',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentTrack.artist}
          </div>
        </div>

        <div className="apple-music-player-controls" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            onClick={playPrev}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              padding: '8px',
              borderRadius: '50%',
            }}
            aria-label="Previous"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            style={{
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={playNext}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              padding: '8px',
              borderRadius: '50%',
            }}
            aria-label="Next"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        <div style={{ width: '220px' }} className="hide-on-mobile" />
      </div>
    </div>
  );
}

