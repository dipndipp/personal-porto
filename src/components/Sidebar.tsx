import React from 'react';
import { Home, Code, Folder, Briefcase, Mail, Github, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Code, label: 'Skills', href: '#skills' },
  { icon: Folder, label: 'Projects', href: '#projects' },
  { icon: Briefcase, label: 'Experience', href: '#experience' },
  { icon: GraduationCap, label: 'Education', href: '#education' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

export function Sidebar() {
  const [active, setActive] = React.useState('#home');
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 h-[85vh]">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-sidebar h-full rounded-full py-8 px-3 flex flex-col items-center justify-between shadow-2xl border border-white/40 bg-white/60 backdrop-blur-xl"
        >
          {/* Logo */}
          <a href="#home" className="relative group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-accent/40 transition-all duration-300 group-hover:scale-110">
              N
            </div>
          </a>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 w-full items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.href)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className="relative group flex items-center justify-center"
              >
                <div
                  className={cn(
                    "p-3.5 rounded-full transition-all duration-300 relative z-10",
                    active === item.href
                      ? "text-white"
                      : "text-text-secondary hover:text-accent"
                  )}
                >
                  <item.icon 
                    size={22} 
                    strokeWidth={active === item.href ? 2.5 : 2} 
                    className="relative z-10"
                  />
                  
                  {/* Active Circle Background */}
                  {active === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-accent rounded-full shadow-lg shadow-accent/30"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* Hover Effect (if not active) */}
                  {active !== item.href && hovered === item.label && (
                    <motion.div
                      layoutId="hoverNav"
                      className="absolute inset-0 bg-accent/10 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
                
                {/* Floating Tooltip */}
                <AnimatePresence>
                  {hovered === item.label && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 20, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/50 text-sm font-semibold text-text-primary whitespace-nowrap z-50 pointer-events-none"
                    >
                      {item.label}
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-8 border-transparent border-r-white/90" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            ))}
          </nav>

          {/* Social / Avatar */}
          <div className="flex flex-col gap-5 items-center">
            <a 
              href="https://github.com/dipndipp" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-secondary hover:text-accent transition-colors hover:scale-110 transform duration-200"
            >
              <Github size={22} />
            </a>
            
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-accent to-purple-400">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <img 
                  src="https://ui-avatars.com/api/?name=Nadhif&background=EA6A5C&color=ffffff&size=128&bold=true" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </aside>

      {/* Mobile Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-md">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="glass-sidebar rounded-full py-3 px-6 flex items-center justify-between shadow-2xl border border-white/40 bg-white/60 backdrop-blur-xl"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.href)}
              className="relative group flex items-center justify-center"
            >
              <div
                className={cn(
                  "p-3 rounded-full transition-all duration-300 relative z-10",
                  active === item.href
                    ? "text-white"
                    : "text-text-secondary"
                )}
              >
                <item.icon 
                  size={20} 
                  strokeWidth={active === item.href ? 2.5 : 2} 
                  className="relative z-10"
                />
                
                {/* Active Circle Background */}
                {active === item.href && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0 bg-accent rounded-full shadow-lg shadow-accent/30"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </>
  );
}
