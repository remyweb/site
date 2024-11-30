"use client";

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-black relative z-10 pt-32 pb-8 z-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mt-8 pt-8 border-t border-[#90CA03]/20">
          <p className="text-gray-400 font-mono text-sm">
            &copy; 2024 Smart World Systems Corp. All rights reserved.
          </p>
          <a
            href="https://instagram.com/sws.corp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 text-[#90CA03] hover:text-[#90CA03]/80 transition-colors mt-4"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-mono text-sm">@sws.corp</span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}