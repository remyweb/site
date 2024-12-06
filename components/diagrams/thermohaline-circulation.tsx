"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";

export function ThermohalineCirculation() {
  return (
    <div className="relative h-[400px] bg-gradient-to-b from-blue-100 to-blue-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://mer.gouv.fr/sites/default/files/styles/standard/public/2022-03/cristian-palmer-XexawgzYOBc-unsplash.jpg.webp?itok=LmlM1QQo')] bg-cover bg-center opacity-20" />

      <motion.div
        className="absolute top-1/4 w-full"
        animate={{ x: [-100, 100] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="flex items-center text-red-500">
          <ArrowRight className="h-8 w-8" />
          <span className="text-sm font-medium">Courant chaud</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 w-full"
        animate={{ x: [100, -100] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="flex items-center text-blue-300">
          <ArrowLeft className="h-8 w-8" />
          <span className="text-sm font-medium">Courant froid</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-1/4 h-full flex flex-col items-center justify-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ArrowDown className="h-8 w-8 text-blue-400" />
        <span className="text-sm font-medium rotate-90">Plongée des eaux</span>
      </motion.div>

      <motion.div
        className="absolute left-1/4 h-full flex flex-col items-center justify-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <ArrowUp className="h-8 w-8 text-red-400" />
        <span className="text-sm font-medium rotate-90">Remontée des eaux</span>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-white">Circulation Thermohaline</p>
      </div>
    </div>
  );
}