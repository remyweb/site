'use client';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  ReactNode,
} from 'react';
import confetti from 'canvas-confetti';

export type ConfettiRef = {
  fire: (options?: confetti.Options) => void;
  firework: () => void;
} | null;

interface ConfettiProps {
  options?: confetti.Options;
  children?: ReactNode;
  className?: string;
}

const Confetti = forwardRef<ConfettiRef, ConfettiProps>((props, ref) => {
  const { options, children, className } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiInstanceRef = useRef<ReturnType<typeof confetti.create> | null>(null);

  const fire = useCallback(
    (confettiOptions: confetti.Options = {}) => {
      if (canvasRef.current && confettiInstanceRef.current) {
        confettiInstanceRef.current({
          ...options,
          ...confettiOptions,
        });
      }
    },
    [options]
  );

  const firework = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confettiInstanceRef.current?.({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confettiInstanceRef.current?.({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  useImperativeHandle(ref, () => ({
    fire,
    firework,
  }));

  useEffect(() => {
    if (canvasRef.current) {
      confettiInstanceRef.current = confetti.create(canvasRef.current, { resize: true });
    }
    return () => {
      if (confettiInstanceRef.current) {
        confettiInstanceRef.current.reset();
        confettiInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      {children}
    </div>
  );
});

Confetti.displayName = 'Confetti';

export { Confetti };