import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Fact } from '@/lib/facts';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface QuizRecapProps {
  facts: Fact[];
  answers: boolean[];
  onRestart: () => void;
}

export function QuizRecap({ facts, answers, onRestart }: QuizRecapProps) {
  const score = answers.reduce((acc, curr, idx) => 
    curr === facts[idx].reponse ? acc + 1 : acc, 0
  );

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
        <Progress value={(score / facts.length) * 100} className="h-2 w-full" />
      </div>
      
      <div className="space-y-4">
        {facts.map((fact, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className={cn(
              'p-4 rounded-lg border backdrop-blur-sm',
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
        className="w-full bg-white/10 hover:bg-white/20 text-white/90"
        onClick={onRestart}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Recommencer
      </Button>
    </motion.div>
  );
}