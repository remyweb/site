import { facts } from '@/lib/fact';
import { QuizGame } from '@/components/quiz/game';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-blue-950/30 to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Quiz Océanique
        </h1>
        <QuizGame facts={facts} />
      </div>
    </main>
  );
}