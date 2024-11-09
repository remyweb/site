'use client';

interface EasterEggProps {
  position: { x: number; y: number };
  imageUrl: string;
}

export function EasterEgg({ position, imageUrl }: EasterEggProps) {
  return (
    <div
      className="fixed transition-all duration-3000 ease-out select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 50,
      }}
    >
      <img
        src={imageUrl}
        alt="Easter Egg"
        className="w-16 h-16 animate-ping"
        style={{
          animation:
            'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite, spin 5s linear infinite',
        }}
      />
    </div>
  );
}
