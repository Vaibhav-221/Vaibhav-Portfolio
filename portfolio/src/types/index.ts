export type PageId = 'home' | 'about' | 'projects' | 'experience' | 'skills' | 'resume' | 'contact';

export interface Wallpaper {
  type: 'image' | 'gradient' | 'original';
  label: string;
  value?: string;
  thumbnail?: string;
}

export interface AppWindow {
  id: string;
  title: string;
  url?: string;
  isApp?: 'apple-music' | 'iframe';
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  url: string;
}

