import React from 'react';
import { cn } from '../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlassPanel({ children, className, intensity = 'medium', ...props }: GlassPanelProps) {
  const intensityClasses = {
    low: 'bg-white/[0.02] backdrop-blur-md border-white/[0.04]',
    medium: 'bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]',
    high: 'bg-white/[0.05] backdrop-blur-3xl border-white/[0.12]',
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl border shadow-lg",
        intensityClasses[intensity],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
