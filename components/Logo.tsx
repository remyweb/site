'use client';

interface LogoProps {
  onClick: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
      <div
          className="flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform duration-200 select-none"
          onClick={onClick}
      >
        <img src="sws.svg" alt="SWS" width="50px" />
      </div>
  );
}
