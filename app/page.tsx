'use client';

import { useState, useCallback } from 'react';
import { CountdownItem } from '@/components/CountdownItem';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { EasterEgg } from '@/components/EasterEgg';
import { useCountdown } from '@/hooks/useCountdown';

export default function Home() {
  const [logoClicks, setLogoClicks] = useState(0);
  const [easterEggs, setEasterEggs] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  const countdown = useCountdown('2024-12-05T16:39:00');

  const handleLogoClick = useCallback(() => {
    setLogoClicks((prev) => {
      const newCount = prev + 1;
      if (newCount % 3 === 0) {
        const timestamp = Date.now();
        const newEasterEggs = [...Array(3)].map((_, index) => {
          const padding = 100; // Padding from window edges
          const x = Math.random() * (window.innerWidth - 2 * padding) + padding;
          const y =
            Math.random() * (window.innerHeight - 2 * padding) + padding;

          return {
            id: `${timestamp}-${index}-${Math.random()}`,
            x,
            y,
          };
        });

        setEasterEggs((prev) => [...prev, ...newEasterEggs]);
        setTimeout(() => {
          setEasterEggs((eggs) =>
            eggs.filter((egg) => !newEasterEggs.includes(egg))
          );
        }, 2000);
      }
      return newCount;
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex flex-col items-center justify-center p-8 select-none">
      <Logo onClick={handleLogoClick} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-16">
        <CountdownItem value={countdown.days} label="Days" />
        <CountdownItem value={countdown.hours} label="Hours" />
        <CountdownItem value={countdown.minutes} label="Minutes" />
        <CountdownItem value={countdown.seconds} label="Seconds" />
      </div>

      {easterEggs.map((egg) => (
        <EasterEgg
          key={egg.id}
          position={{ x: egg.x, y: egg.y }}
          imageUrl="wiwi.png"
        />
      ))}

      <Footer />
    </main>
  );
}
