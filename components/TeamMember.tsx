import { motion } from 'framer-motion';
import { useState } from 'react';
import CryptoJS from 'crypto-js';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl?: string;
  index: number;
  isThomas?: boolean;
  onThomasClick?: () => void;
}

export function TeamMember({
  name,
  role,
  imageUrl,
  index,
  isThomas,
  onThomasClick,
}: TeamMemberProps) {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    if (isThomas) {
      setClicks((prev) => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          const gameState = {
            clicks: 0,
            multiplier: 1,
            lastSaved: new Date().toISOString(),
          };
          const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(gameState),
            'secret-key'
          ).toString();
          localStorage.setItem('cookie-game', encrypted);
          window.location.href = '/cookie-clicker';
        }
        if (onThomasClick) onThomasClick();
        return newCount;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={handleClick}
      className={`
        bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-800 
        hover:border-zinc-700 transition-all duration-300 cursor-pointer
        ${isThomas ? 'hover:shadow-lg hover:shadow-[#90CA03]/20' : ''}
      `}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-xl md:text-2xl font-bold">
          {name[0]}
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold">{name}</h3>
          <p className="text-sm md:text-base text-zinc-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}