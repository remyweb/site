"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Particle } from "./particle-system";

export function InteractiveComparison() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOceanMode, setIsOceanMode] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize particles
    const particleCount = 100;
    const newParticles = [];
    const color = isOceanMode ? "rgba(59, 130, 246, 0.6)" : "rgba(239, 68, 68, 0.6)";

    for (let i = 0; i < particleCount; i++) {
      newParticles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          color
        )
      );
    }
    setParticles(newParticles);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background elements
      if (isOceanMode) {
        drawOceanBackground(ctx, canvas.width, canvas.height);
      } else {
        drawBodyBackground(ctx, canvas.width, canvas.height);
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOceanMode]);

  const drawOceanBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Draw ocean currents
    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.quadraticCurveTo(width / 2, height / 4, width, height / 2);
    ctx.stroke();
  };

  const drawBodyBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Draw blood vessels
    ctx.strokeStyle = "rgba(239, 68, 68, 0.3)";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.quadraticCurveTo(width / 2, height * 0.75, width, height / 2);
    ctx.stroke();
  };

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Define regions and their descriptions
    if (y > rect.height / 2 - 50 && y < rect.height / 2 + 50) {
      setHoveredRegion(
        isOceanMode
          ? "Courants océaniques : Transport des nutriments et régulation thermique"
          : "Vaisseaux sanguins : Transport de l'oxygène et des nutriments"
      );
    } else {
      setHoveredRegion(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          variant={isOceanMode ? "default" : "outline"}
          onClick={() => setIsOceanMode(true)}
        >
          Mode Océan
        </Button>
        <Button
          variant={!isOceanMode ? "default" : "outline"}
          onClick={() => setIsOceanMode(false)}
        >
          Mode Corps Humain
        </Button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] rounded-xl border border-blue-200 dark:border-blue-800"
          onMouseMove={handleCanvasHover}
          onMouseLeave={() => setHoveredRegion(null)}
        />
        {hoveredRegion && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-blue-900 p-2 rounded-lg shadow-lg text-sm">
            {hoveredRegion}
          </div>
        )}
      </div>

      <p className="text-center text-sm text-blue-600 dark:text-blue-300">
        Survolez les différentes zones pour découvrir les parallèles entre l&apos;océan et le corps humain
      </p>
    </div>
  );
}