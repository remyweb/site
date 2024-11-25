"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from '@/components/Logo';
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const logoScale = useTransform(scrollY, [0, isMobile ? 90 : 180], isMobile ? [2.0, 1.0] : [3.0, 1.0]);
  const logoY = useTransform(scrollY, [0, isMobile ? 90 : 180], isMobile ? [60, 0] : [80, 0]);

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );
  const headerHeight = useTransform(scrollY, [0, 100], ["100px", "64px"]);
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navY = useTransform(scrollY, [0, 100], [20, 0]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg, height: headerHeight }}
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      >
        <div className="container mx-auto px-4 h-full relative">
          <div className="flex justify-center items-center h-full">
            <motion.div
              style={{ scale: logoScale, y: logoY }}
              className="flex items-center gap-1.5 md:gap-2 origin-center absolute"
            >
              <Logo onClick={() => {}} />
            </motion.div>
            
            <motion.nav
              style={{ opacity: navOpacity, y: navY }}
              className="absolute right-4 hidden md:flex gap-8"
            >
              <NavLink href="#team">Team</NavLink>
              <NavLink href="#mission">Mission</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </motion.nav>

            <motion.div
              style={{ opacity: navOpacity }}
              className="absolute right-4 md:hidden"
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-end gap-1.5 p-2 group"
                aria-label="Menu"
              >
                <span className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300",
                  isMenuOpen && "rotate-45 translate-y-2"
                )} />
                <span className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300 group-hover:w-6",
                  isMenuOpen && "opacity-0"
                )} />
                <span className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300",
                  isMenuOpen && "-rotate-45 -translate-y-2"
                )} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <NavLink href="#team" onClick={() => setIsMenuOpen(false)}>Team</NavLink>
              <NavLink href="#mission" onClick={() => setIsMenuOpen(false)}>Mission</NavLink>
              <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ 
  href, 
  children,
  onClick
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm md:text-base font-medium text-white/70 transition-colors hover:text-white",
        "relative after:absolute after:bottom-0 after:left-0 after:h-[2px]",
        "after:w-0 after:bg-white after:transition-all hover:after:w-full"
      )}
    >
      {children}
    </a>
  );
}