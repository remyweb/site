"use client";

import { motion } from "framer-motion";
import { Sun, Leaf, ArrowDown } from "lucide-react";

export function PhytoplanktonCycle() {
  return (
    <div className="relative h-[400px] bg-gradient-to-b from-sky-200 to-blue-600 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580019542155-247062e19ce4')] bg-cover bg-center opacity-20" />
      
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Sun className="h-12 w-12 text-yellow-500" />
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: "40%"
          }}
          animate={{
            y: [0, 10, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          <Leaf className="h-6 w-6 text-green-400" />
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-8 w-full flex justify-center gap-8"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {[...Array(3)].map((_, i) => (
          <ArrowDown key={i} className="h-8 w-8 text-blue-200" />
        ))}
      </motion.div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-white">Cycle du Phytoplancton</p>
      </div>
    </div>
  );
}