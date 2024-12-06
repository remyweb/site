"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold text-primary mb-2">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </motion.div>
    </Card>
  );
}