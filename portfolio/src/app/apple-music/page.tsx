import AppleMusicApp from '@/components/AppleMusicApp';

export const metadata = {
  title: 'Apple Music — Coding Focus',
  description: 'Deep focus tracks to get you in the zone.',
};

export default function AppleMusicPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AppleMusicApp />
    </main>
  );
}
