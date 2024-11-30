"use client";

import { motion } from 'framer-motion';
import { TipCard } from '@/components/ui/tip-card';
import { PDFDownloadButton } from '@/components/pdf-generator';
import { codingTips } from '@/lib/tips';
import { Terminal } from 'lucide-react';
import { MatrixBackground } from '@/components/matrix-background';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <MatrixBackground />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="flex flex-col items-center justify-center mb-12 space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="relative"
            >
              <Terminal className="h-20 w-20 text-[#90CA03]" />
            </motion.div>
            <h1 className="text-5xl font-bold text-[#90CA03] font-mono text-center">
              SWS ELITE
            </h1>
            <p className="text-gray-400 font-mono text-center max-w-2xl px-4 sm:px-0">
              Conseils d'experts SWS pour dominer la compétition. <br /> Téléchargez notre guide
              et élevez votre niveau.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <PDFDownloadButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {codingTips.map((tip, index) => (
              <TipCard key={tip.id} tip={tip} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}