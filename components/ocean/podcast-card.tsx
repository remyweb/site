"use client";

import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PodcastEpisode {
  id: string;
  title: string;
  expert: string;
  duration: string;
  description: string;
  imageUrl: string;
}

interface PodcastCardProps {
  episode: PodcastEpisode;
}

export function PodcastCard({ episode }: PodcastCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <motion.img
          src={episode.imageUrl}
          alt={episode.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{episode.expert} • {episode.duration}</p>
        <p className="text-sm">{episode.description}</p>
      </div>
    </Card>
  );
}