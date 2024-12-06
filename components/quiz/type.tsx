import type { Fact } from '@/lib/fact';

export interface QuizCardProps {
  fact: Fact;
  onAnswer: (isCorrect: boolean) => void;
}

export interface AnswerHistory {
  question: string;
  wasCorrect: boolean;
  explanation: string;
}

export interface QuizGameProps {
  facts: Fact[];
}