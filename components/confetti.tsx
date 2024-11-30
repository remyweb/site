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

  useImperativeHandle(ref, () => ({
    fire,
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
    <div className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}>
      <canvas ref={canvasRef} />
      {children}
    </div>
  );
});

Confetti.displayName = 'Confetti';

export { Confetti };