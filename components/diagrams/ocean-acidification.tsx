"use client";

import { motion } from "framer-motion";
import { CloudRain, Droplets, Waves } from "lucide-react";

export function OceanAcidification() {
  return (
    <div className="relative h-[400px] bg-gradient-to-b from-sky-100 to-blue-800 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583212292454-1fe6229603b7')] bg-cover bg-center opacity-20" />
      
      <motion.div
        className="absolute top-8 left-1/4"
        animate={{ y: [0, 100], opacity: [1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <CloudRain className="h-8 w-8 text-gray-600" />
        <span className="text-xs font-medium">CO₂</span>
      </motion.div>

      <motion.div
        className="absolute top-8 right-1/4"
        animate={{ y: [0, 100], opacity: [1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Droplets className="h-8 w-8 text-blue-400" />
        <span className="text-xs font-medium">H⁺</span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 w-full"
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Waves className="h-12 w-full text-blue-600" />
      </motion.div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-white">Acidification des océans</p>
      </div>
    </div>
  );
}