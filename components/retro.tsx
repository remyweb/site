"use client";

import React, { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface GameObject extends Position {
  type: "debris" | "bubble";
}

const RetroGame: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: 50,
    y: 90,
  });
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [debrisInterval, setDebrisInterval] = useState(1000);

  // Augmenter la difficulté au fil du temps
  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    const difficultyIncrease = setInterval(() => {
      if (debrisInterval > 200) {
        setDebrisInterval((prev) => prev - 50);
      }
    }, 5000);

    return () => clearInterval(difficultyIncrease);
  }, [gameStarted, isGameOver, debrisInterval]);

  // Générer des déchets marins et des bulles
  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    const interval = setInterval(() => {
      const isBubble = Math.random() < 0.4;
      setObstacles((prev) => [
        ...prev,
        {
          x: Math.random() * 90,
          y: 0,
          type: isBubble ? "bubble" : "debris",
        },
      ]);
    }, debrisInterval);

    return () => clearInterval(interval);
  }, [gameStarted, isGameOver, debrisInterval]);

  // Déplacer les obstacles
  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obj) => ({ ...obj, y: obj.y + 5 }))
          .filter((obj) => obj.y <= 110)
      );
    }, 200);

    return () => clearInterval(interval);
  }, [gameStarted, isGameOver]);

  // Vérifier les collisions
  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    obstacles.forEach((obj) => {
      const distanceX = Math.abs(obj.x - playerPosition.x);
      const distanceY = Math.abs(obj.y - (playerPosition.y - 10));
      if (distanceX < 5 && distanceY < 5) {
        if (obj.type === "debris") {
          setIsGameOver(true);
        } else if (obj.type === "bubble") {
          setScore((prev) => prev + 1);
          setObstacles((prev) => prev.filter((o) => o !== obj));
        }
      }
    });
  }, [gameStarted, isGameOver, obstacles, playerPosition]);

  // Gérer le clavier (gauche et droite seulement)
  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      setPlayerPosition((prev) => {
        if (e.key === "ArrowLeft") {
          return { ...prev, x: Math.max(prev.x - 7, 5) };
        } else if (e.key === "ArrowRight") {
          return { ...prev, x: Math.min(prev.x + 7, 95) };
        }
        return prev;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, isGameOver]);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRetry = () => {
    setPlayerPosition({ x: 50, y: 90 });
    setObstacles([]);
    setScore(0);
    setIsGameOver(false);
    setDebrisInterval(1000);
    setGameStarted(true);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] font-retro"
    >
        <img src="/cube.svg" alt="Rubik's Cube" className="w-10 h-10" />
      <h1 className="text-3xl mb-8">Protecteur des Océans</h1>
      {!gameStarted ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleStart}
            className="bg-[hsl(222,47%,20%)] text-[var(--foreground)] px-6 py-3 rounded-lg shadow-md hover:bg-opacity-90"
          >
            Commencer le jeu
          </button>
        </div>
      ) : isGameOver ? (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl mb-4">Perdu 😔</h2>
          <p className="text-xl mb-6">
            Votre score : <span className="font-bold">{score}</span>
          </p>
          <button
            onClick={handleRetry}
            className="bg-[hsl(222,47%,20%)] text-[var(--foreground)] px-6 py-3 rounded-lg shadow-md hover:bg-opacity-90"
          >
            Rejouer
          </button>
        </div>
      ) : (
        <div
          className="relative w-[300px] h-[400px] overflow-hidden bg-[hsl(222,47%,20%)] border-4 border-[var(--foreground)]"
        >
          <div
            className="absolute text-3xl transition-transform duration-300 ease-in-out"
            style={{
              bottom: `10%`,
              left: `${playerPosition.x}%`,
              transform: "translate(-50%, 0)",
            }}
          >
            🐬
          </div>
          {/* Obstacles */}
          {obstacles.map((obj, index) => (
            <div
              key={index}
              className="absolute text-2xl"
              style={{
                top: `${obj.y}%`,
                left: `${obj.x}%`,
                transform: "translate(-50%, 0)",
              }}
            >
              {obj.type === "debris" ? "🗑️" : "💧"}
            </div>
          ))}
        </div>
      )}
      {gameStarted && !isGameOver && <p className="mt-4">Score : {score}</p>}
    </div>
  );
};

export default RetroGame;
