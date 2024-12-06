import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Fact } from './fact';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomQuestions(questions: Fact[], count: number = 10): Fact[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffleQuestions(questions: Fact[]): Fact[] {
  return [...questions].sort(() => Math.random() - 0.5);
}

export function calculateScore(correct: number, total: number): number {
  return Math.round((correct / total) * 100);
}