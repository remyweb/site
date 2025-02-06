import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/components/TeamMember';

interface TeamMemberType {
  name: string;
  role: string;
  imageUrl?: string;
  isThomas?: boolean;
}

export function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([
    { name: 'Rémy', role: 'Project Manager' },
    { name: 'Thomas', role: 'Supervisor', isThomas: true },
    { name: 'Jossua', role: 'Director' },
  ]);

  useEffect(() => {
    const shuffleArray = (array: TeamMemberType[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setTeamMembers(shuffleArray(teamMembers));
  }, []);

  return (
    <section id="team" className="min-h-screen flex items-center bg-auto py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.name}
              {...member}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}