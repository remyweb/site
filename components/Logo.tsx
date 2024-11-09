'use client';

import { Terminal } from 'lucide-react';

interface LogoProps {
  onClick: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <div
      className="flex flex-col items-center mb-16 cursor-pointer transform hover:scale-105 transition-transform duration-200 select-none"
      onClick={onClick}
    >
      <img src="logo.png" alt="SWS" width="150px" />
    </div>
  );
}
