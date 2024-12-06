'use client';

import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full mb-4">
      <Progress value={progress} className="h-1.5 bg-white/10" />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mt-2"
      >
        <span className="text-sm text-white/50">
          Question {current + 1} sur {total}
        </span>
        <span className="text-sm font-medium text-white/70">
          {Math.round(progress)}%
        </span>
      </motion.div>
    </div>
  );
}