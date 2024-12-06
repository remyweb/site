'use client';

import { useState } from 'react';
import { Fact } from '@/lib/facts';
import { QuizCard } from './QuizCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QuizProps {
  facts: Fact[];
}

export function Quiz({ facts }: QuizProps) {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showRecap, setShowRecap] = useState(false);

  const paginate = (newDirection: number, isCorrect: boolean) => {
    setAnswers([...answers, isCorrect]);
    
    if (currentIndex === facts.length - 1) {
      setTimeout(() => setShowRecap(true), 300);
    } else {
      setPage([currentIndex + 1, newDirection]);
    }
  };

  const score = answers.reduce((acc, curr, idx) => 
    curr === facts[idx].reponse ? acc + 1 : acc, 0
  );

  const progress = (currentIndex / facts.length) * 100;

  if (showRecap) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto p-6 space-y-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-medium text-white/90 mb-2">Score Final</h2>
          <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            {score}/{facts.length}
          </div>
          <Progress value={(score / facts.length) * 100} className="h-2 w-full bg-white/10" />
        </div>
        
        <div className="space-y-4">
          {facts.map((fact, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className={cn(
                'p-4 rounded-lg border backdrop-blur-sm transition-colors',
                answers[idx] === fact.reponse
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              )}
            >
              <p className="font-medium text-white/80 mb-2">{fact.question}</p>
              {answers[idx] !== fact.reponse && (
                <p className="text-sm text-white/50 mt-2">
                  {fact.justification}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <Button
          className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white/90 border border-white/10"
          onClick={() => {
            setPage([0, 0]);
            setAnswers([]);
            setShowRecap(false);
          }}
        >
          Recommencer
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative h-[500px] w-full max-w-md mx-auto">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Progress value={progress} className="h-1 bg-white/10" />
      </div>
      
      <div className="relative pt-4">
        <AnimatePresence initial={false} custom={direction}>
          <QuizCard
            key={currentIndex}
            fact={facts[currentIndex]}
            onSwipe={(isTrue) => {
              paginate(isTrue ? 1 : -1, isTrue);
            }}
            direction={direction === 1 ? 'right' : 'left'}
            custom={direction}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}