'use client';
import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Confetti, ConfettiRef } from '@/components/confetti';

interface LogoProps {
  onClick: () => void;
}

export function Logo({ onClick }: LogoProps) {
  const [clicks, setClicks] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const handleLogoClick = useCallback(() => {
    setClicks((prev) => {
      const newCount = prev + 1;
      console.log(`Logo clicked ${newCount} times`);
      if (newCount % 3 === 0) {
        console.log('Triggering confetti and showing Easter Egg');
        confettiRef.current?.firework();
        setShowImage(true);
        setTimeout(() => setShowImage(false), 2000);
      }
      return newCount;
    });
    onClick();
  }, [onClick]);

  return (
    <div className="relative">
      <motion.div
        onClick={handleLogoClick}
        whileHover={{ scale: 1.1 }}
        className="flex flex-col items-center cursor-pointer select-none"
      >
        <Image src="/sws.svg" alt="SWS" width={50} height={50} />
      </motion.div>
      <Confetti ref={confettiRef} className="fixed inset-0 w-full h-full" />
      {showImage && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute w-16 h-16"
        >
          <Image
            src="/wiwi.png"
            alt="Easter Egg"
            className="animate-ping"
            width={64}
            height={64}
          />
        </motion.div>
      )}
    </div>
  );
}