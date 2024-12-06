'use client';

import { motion } from 'framer-motion';
import { Fact } from '@/lib/fact';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  question: Fact;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizCard({ question, onAnswer }: QuizCardProps) {
  return (
    <motion.div
      className="relative w-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onAnswer(info.offset.x > 0);
        }
      }}
      whileDrag={{
        scale: 1.05,
      }}
    >
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-blue-900/50 to-blue-950/50 backdrop-blur-lg border border-blue-500/20 shadow-xl">
        <div className="absolute inset-0 bg-blue-500/5 rounded-xl" />
        
        <div className="relative z-10">
          <h3 className="text-xl text-blue-50 leading-relaxed">
            {question.question}
          </h3>
          
          <div className="mt-8 flex justify-between text-sm text-blue-200/70">
            <span>← Faux</span>
            <span>Vrai →</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}