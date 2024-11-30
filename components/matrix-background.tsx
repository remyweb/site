"use client";

import { useEffect, useRef } from 'react';

export function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const characters = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    const createRainDrop = () => {
      const element = document.createElement('div');
      element.className = 'matrix-rain';
      element.style.left = `${Math.random() * 100}%`;
      element.style.animationDelay = `${Math.random() * 5}s`;
      element.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
      container.appendChild(element);

      setTimeout(() => {
        element.remove();
      }, 8000);
    };

    const interval = setInterval(() => {
      createRainDrop();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="matrix-bg" />;
}