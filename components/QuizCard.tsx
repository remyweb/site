'use client';

import { motion } from 'framer-motion';
import { Fact } from '@/lib/facts';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/lib/animations';
import { Check, X } from 'lucide-react';

interface QuizCardProps {
  fact: Fact;
  onSwipe: (isCorrect: boolean) => void;
  direction: 'left' | 'right' | null;
  custom: number;
}

export function QuizCard({ fact, onSwipe, direction, custom }: QuizCardProps) {
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.div
      className="absolute w-full max-w-md"
      custom={custom}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          onSwipe(false);
        } else if (swipe > swipeConfidenceThreshold) {
          onSwipe(true);
        }
      }}
    >
      <motion.div
        className={cn(
          'relative w-full overflow-hidden backdrop-blur-xl',
          'rounded-xl border border-white/10',
          'h-[400px] transition-all duration-300',
          direction === 'right' && 'side-shadow-true',
          direction === 'left' && 'side-shadow-false'
        )}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(10,50,80,0.2) 100%)',
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="text-green-500/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: direction === 'right' ? 1 : 0,
              scale: direction === 'right' ? 1.2 : 0.5,
              x: direction === 'right' ? 20 : 0
            }}
          >
            <Check size={120} strokeWidth={3} />
          </motion.div>
          <motion.div
            className="text-red-500/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: direction === 'left' ? 1 : 0,
              scale: direction === 'left' ? 1.2 : 0.5,
              x: direction === 'left' ? -20 : 0
            }}
          >
            <X size={120} strokeWidth={3} />
          </motion.div>
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl font-medium text-white/90 text-center leading-relaxed">
              {fact.question}
            </h2>
          </div>
          
          <div className="flex justify-between text-sm text-white/50 mt-4 pt-4 border-t border-white/10">
            <span className="flex items-center gap-2 transition-colors hover:text-white/80">
              <X size={16} /> Faux
            </span>
            <span className="flex items-center gap-2 transition-colors hover:text-white/80">
              Vrai <Check size={16} />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}