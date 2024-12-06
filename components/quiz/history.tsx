'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { AnswerHistory } from './types';
import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';

interface HistoryViewProps {
  history: AnswerHistory[];
  onClose: () => void;
}

export function HistoryView({ history, onClose }: HistoryViewProps) {
  const correctAnswers = history.filter(answer => answer.wasCorrect).length;
  const percentage = (correctAnswers / history.length) * 100;

  // Prevent body scroll when history view is open
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="h-screen flex flex-col max-w-2xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col rounded-xl border border-white/10 bg-black/20 overflow-hidden"
        >
          {/* Fixed Header */}
          <div className="flex-none p-6 border-b border-white/10 bg-black/30">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Historique des Réponses
                </h2>
                <div className="flex items-center gap-4">
                  <Progress value={percentage} className="w-32 h-2 bg-white/10" />
                  <span className="text-sm text-white/70">
                    {correctAnswers} / {history.length} correct
                  </span>
                </div>
              </div>
              <Button 
                onClick={onClose} 
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto history-scroll">
            <div className="p-6 space-y-4">
              {history.map((answer, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl backdrop-blur-sm border ${
                    answer.wasCorrect 
                      ? 'border-green-500/20 bg-green-500/5' 
                      : 'border-red-500/20 bg-red-500/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 ${
                      answer.wasCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {answer.wasCorrect 
                        ? <CheckCircle2 className="w-5 h-5" />
                        : <XCircle className="w-5 h-5" />
                      }
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-2">
                        Question {index + 1}
                      </h3>
                      <p className="text-white/90 mb-3">
                        {answer.question}
                      </p>
                      <div className={`text-sm ${
                        answer.wasCorrect 
                          ? 'text-green-300/90' 
                          : 'text-white/70'
                      }`}>
                        {answer.wasCorrect 
                          ? '✓ Bonne réponse' 
                          : <div>
                              <div className="text-red-300/90 mb-1">✗ Mauvaise réponse</div>
                              <div className="text-white/70">{answer.explanation}</div>
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}