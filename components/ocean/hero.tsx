'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export function Hero() {
  const scrollToInfo = () => {
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-30"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Protégeons Nos Océans
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ensemble, agissons pour préserver la biodiversité marine et lutter contre la pollution des océans.
          </p>
          
          <Button 
            size="lg"
            onClick={scrollToInfo}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            En savoir plus
          </Button>
        </motion.div>
      </div>
    </section>
  );
}