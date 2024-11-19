'use client';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function ContactUs() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <section id="contact" className="min-h-screen bg-auto py-20">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16"
                >
          <span className="text-gray-50">
            Contact Us
          </span>
                </motion.h2>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="relative">
                            <label htmlFor="lastName" className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#90CA03]/50 transition-all duration-300"
                                />
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 transition-colors duration-300" />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="firstName" className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#90CA03]/50 transition-all duration-300"
                                />
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 transition-colors duration-300" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#90CA03]/50 transition-all duration-300"
                            />
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 transition-colors duration-300" />
                        </div>
                    </div>

                    <div className="mb-8 relative">
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                        <div className="relative">
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Enter your message"
                                className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#90CA03]/30 transition-all duration-300 resize-none"
                            />
                            <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-zinc-600" />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ rotate: 40600 }}
                        whileTap={{ scale: 5.0 }}
                        className={`w-full md:w-auto md:min-w-[200px] mx-auto flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 rounded-xl font-medium text-white relative overflow-hidden ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#90CA03] to-[#7AB002] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">Send Message</span>
                        <Send className="w-4 h-4 relative" />
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';

export function ContactUs() {
    return (
        <motion.div
            animate={{
                scale: [1, 25, 1], // Taille initiale, agrandissement, retour à la taille initiale
            }}
            transition={{
                duration: 1.5, // Durée totale de l'animation
                repeat: Infinity, // Animation en boucle infinie
                ease: 'easeInOut', // Adoucissement
            }}
            className="flex justify-center items-center min-h-screen text-6xl"
        >
        </motion.div>
    );
}
