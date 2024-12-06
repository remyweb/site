"use client";

import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, CloudRain, Trees } from "lucide-react";

export function CarbonCycle() {
  return (
    <div className="relative h-[400px] bg-gradient-to-b from-sky-100 to-blue-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551244072-5d12893278ab')] bg-cover bg-center opacity-20" />

      <motion.div 
        className="absolute top-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <CloudRain className="h-12 w-12 text-gray-700" />
        <motion.div
          className="absolute -right-8 top-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CO₂
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/4"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Trees className="h-8 w-8 text-green-500" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-200"
        >
          O₂
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 w-full"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="relative h-20 bg-blue-500/20 backdrop-blur-sm">
          <motion.div
            className="absolute inset-0"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}