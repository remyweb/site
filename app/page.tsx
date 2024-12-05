'use client';

import { useState, useCallback } from 'react';
import { CountdownItem } from '@/components/CountdownItem';
import { InstagramPuzzleGame } from '@/components/Instagram';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Team } from '@/components/Team';
import { OurMission } from '@/components/OurMission';
import { EasterEgg } from '@/components/EasterEgg';
import { useCountdown } from '@/hooks/useCountdown';
import { ContactUs } from '@/components/contactUs';
import { ChatPopUp } from "@/components/ui/popup";
import Game from '@/components/Game';


export default function Home() {
  const [logoClicks, setLogoClicks] = useState(0);
  const [easterEggs, setEasterEggs] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const countdown = useCountdown('2024-12-05T16:39:00');

  const handleLogoClick = useCallback(() => {
    setLogoClicks((prev) => {
      const newCount = prev + 1;
      if (newCount % 3 === 0) {
        const timestamp = Date.now();
        const newEasterEggs = [...Array(3)].map((_, index) => {
          const padding = 100; // Padding from window edges
          const x = Math.random() * (window.innerWidth - 2 * padding) + padding;
          const y = Math.random() * (window.innerHeight - 2 * padding) + padding;
          return {
            id: `${timestamp}-${index}-${Math.random()}`,
            x,
            y,
          };
        });
        setEasterEggs((prev) => [...prev, ...newEasterEggs]);
        setTimeout(() => {
          setEasterEggs((eggs) => eggs.filter((egg) => !newEasterEggs.includes(egg)));
        }, 2000);
      }
      return newCount;
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <Nav />
      <Hero />
      <Team />
      <OurMission />
      <ContactUs />
      <InstagramPuzzleGame />
      <ChatPopUp />
      <Footer />
      <Game />
    </main>
  );
}