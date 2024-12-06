'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, History } from 'lucide-react';
import { calculateScore } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface GameOverProps {
  score: number;
  total: number;
  onRestart: () => void;
  onShowHistory: () => void;
}

export function GameOver({ score, total, onRestart, onShowHistory }: GameOverProps) {
  const percentage = calculateScore(score, total);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8 rounded-xl backdrop-blur-lg border border-white/10 bg-black/20 max-w-md mx-auto"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <Trophy className="w-16 h-16 text-yellow-400/90 mx-auto" />
      </motion.div>

      <h2 className="text-3xl font-bold text-white mb-4">
        Quiz Terminé !
      </h2>

      <div className="mb-8">
        <div className="text-2xl text-white/90 mb-2">
          {score} / {total} correct
        </div>
        <Progress value={percentage} className="h-2 w-full bg-white/10" />
        <p className="text-lg text-white/70 mt-2">
          Score final : {percentage}%
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={onRestart}
          size="lg"
          className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Rejouer
        </Button>
        <Button 
          onClick={onShowHistory}
          size="lg"
          className="bg-white/5 hover:bg-white/10 text-white border border-white/10"
        >
          <History className="w-4 h-4 mr-2" />
          Historique
        </Button>
      </div>
    </motion.div>
  );
}