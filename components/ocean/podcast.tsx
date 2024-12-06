"use client";

import { motion } from "framer-motion";
import { PodcastCard } from "./podcast-card";

const podcastEpisodes = [
  {
    id: "1",
    title: "L'Océan, notre Second Poumon",
    expert: "Dr. Marie Laurent",
    duration: "25 min",
    description: "Découvrez comment l'océan, tel notre système respiratoire, régule les échanges gazeux de notre planète.",
    imageUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab",
  },
  {
    id: "2",
    title: "Les Courants, le Sang de notre Planète",
    expert: "Prof. Thomas Martin",
    duration: "30 min",
    description: "Une exploration fascinante des courants océaniques et leur rôle dans la régulation du climat terrestre.",
    imageUrl: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a",
  },
  {
    id: "3",
    title: "La Barrière de Corail, notre Squelette Marin",
    expert: "Dr. Sarah Cohen",
    duration: "28 min",
    description: "Comment les récifs coralliens structurent et protègent la vie marine, à l'image de notre squelette.",
    imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0",
  },
];

export function PodcastSection() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Écoutez nos Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcastEpisodes.map((episode) => (
            <PodcastCard key={episode.id} episode={episode} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}