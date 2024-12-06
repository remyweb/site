'use client';

import { motion, useMotionValue, useTransform, PanInfo, useAnimation } from 'framer-motion';
import { Check, X, Grab } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QuizCardProps } from './type';

export function QuizCard({ fact, onAnswer }: QuizCardProps) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Transform values for interactive animations
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const backgroundOpacityRight = useTransform(x, [0, 100], [0, 0.2]);
  const backgroundOpacityLeft = useTransform(x, [-100, 0], [0.2, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setShowTutorial(false);
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    const isSwipeFast = velocity > 500;

    if (Math.abs(info.offset.x) > threshold || isSwipeFast) {
      const direction = info.offset.x > 0;
      onAnswer(direction);
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  // Tutorial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] max-h-[600px] min-h-[400px] flex items-center justify-center">
      <motion.div
        className="absolute w-full max-w-xl mx-auto cursor-grab active:cursor-grabbing touch-none"
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative p-8 rounded-2xl bg-black/40 border border-white/10 shadow-2xl overflow-hidden">
          {/* Dynamic Background Indicators */}
          <motion.div 
            className="absolute inset-0 bg-green-500/20"
            style={{ opacity: backgroundOpacityRight }}
          />
          <motion.div 
            className="absolute inset-0 bg-red-500/20"
            style={{ opacity: backgroundOpacityLeft }}
          />
          
          {/* Answer Indicators */}
          <motion.div 
            className="absolute top-6 right-6 text-green-500"
            style={{ opacity: backgroundOpacityRight }}
          >
            <Check className="w-8 h-8" />
          </motion.div>
          <motion.div 
            className="absolute top-6 left-6 text-red-500"
            style={{ opacity: backgroundOpacityLeft }}
          >
            <X className="w-8 h-8" />
          </motion.div>
          
          {/* Question Content */}
          <motion.div 
            className="relative z-10"
            style={{ opacity }}
          >
            <h3 className="text-xl md:text-2xl text-white/90 text-center leading-relaxed mb-8">
              {fact.question}
            </h3>

            <div className="flex justify-between items-center text-sm text-white/70">
              <span className="flex items-center gap-2">
                <X className="w-4 h-4" /> Faux
              </span>
              <span className="flex items-center gap-2">
                Vrai <Check className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          {/* Grip Indicator */}
          <motion.div 
            className="absolute bottom-6 left-0 right-0 flex justify-center"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Grab className="w-6 h-6 text-white/40" />
          </motion.div>
        </div>
      </motion.div>

      {/* Swipe Tutorial */}
      {showTutorial && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
        >
          <motion.div 
            className="px-6 py-3 rounded-full bg-black/60 text-white/70 backdrop-blur-sm border border-white/10"
            animate={{ 
              x: [-100, 100, -100],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-sm whitespace-nowrap">← Glissez pour répondre →</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}