'use client';

import { useState, useCallback } from 'react';
import { QuizCard } from './card';
import { HistoryView } from './history';
import { GameOver } from './game-over';
import { QuizProgress } from './progress';
import { QuizGameProps, AnswerHistory } from './type';
import { getRandomQuestions } from '@/lib/utils';

export function QuizGame({ facts }: QuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState(() => 
    getRandomQuestions(facts, 10)
  );

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setScore(prev => isCorrect ? prev + 1 : prev);
    
    setAnswerHistory(prev => [...prev, {
      question: currentQuestions[currentIndex].question,
      wasCorrect: isCorrect,
      explanation: currentQuestions[currentIndex].justification
    }]);
    
    setTimeout(() => {
      if (currentIndex === currentQuestions.length - 1) {
        setIsGameOver(true);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 300);
  }, [currentIndex, currentQuestions]);

  const restartGame = useCallback(() => {
    setCurrentQuestions(getRandomQuestions(facts, 10));
    setCurrentIndex(0);
    setScore(0);
    setIsGameOver(false);
    setAnswerHistory([]);
    setShowHistory(false);
  }, [facts]);

  if (showHistory) {
    return <HistoryView history={answerHistory} onClose={() => setShowHistory(false)} />;
  }

  if (isGameOver) {
    return (
      <GameOver 
        score={score}
        total={currentQuestions.length}
        onRestart={restartGame}
        onShowHistory={() => setShowHistory(true)}
      />
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <QuizProgress 
        current={currentIndex} 
        total={currentQuestions.length} 
      />
      <QuizCard
        key={currentIndex}
        fact={currentQuestions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
}