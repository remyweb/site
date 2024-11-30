'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  onClick: () => void;
}

export function Logo({ onClick }: LogoProps) {
  const [clicks, setClicks] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const handleLogoClick = useCallback(() => {
    setClicks((prev) => {
      const newCount = prev + 1;
      console.log(`Logo clicked ${newCount} times`);
      if (newCount % 3 === 0) {
        console.log('Showing Easter Egg');
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