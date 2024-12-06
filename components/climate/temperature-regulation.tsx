"use client";

import { motion } from "framer-motion";

const heatPoints = [
  { x: 20, y: 30, temp: "Courant chaud" },
  { x: 70, y: 60, temp: "Courant froid" },
  { x: 45, y: 45, temp: "Zone de mélange" },
];

export function TemperatureRegulation() {
  return (
    <div className="relative h-[400px] bg-gradient-to-br from-red-100 via-blue-100 to-blue-300 rounded-xl overflow-hidden">
      {heatPoints.map((point, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          whileHover={{ scale: 1.1 }}
        >
          <p className="absolute top-6 left-6 text-sm font-medium">{point.temp}</p>
        </motion.div>
      ))}
    </div>
  );
}