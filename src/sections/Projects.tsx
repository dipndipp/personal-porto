import { useState } from 'react';
import { GlassPanel } from '../components/GlassPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { FadeIn } from '../components/FadeIn';

// AnimatePresence is kept here because the project switcher is interactive
// (not scroll-driven), so it needs its own imperative transition.
// Key optimisations applied:
//   1. Removed `x: ±20` from enter/exit — lateral translate during an
//      AnimatePresence transition forces the browser to recalculate
//      clipping bounds on every frame. Pure opacity transition is 0-cost.
//   2. `will-change: opacity, transform` + `translateZ(0)` on the image
//      keeps the scale hover in its own GPU layer.
//   3. The decorative glow blob behind the preview is layer-promoted.

const projects = [
  {
    id: 1,
    title: 'Farmetrica',
    category: 'Digital Monitoring Platform',
    description:
      'A comprehensive farming monitoring platform featuring real-time data visualization, transaction monitoring, and predictive reporting using AI based on East Java farming result.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    image: 'farmetrica.webp',
    demo: 'https://farmetrica-jatim.vercel.app',
    github: 'https://github.com/dipndipp/farmetrica',
  },
  {
    id: 2,
    title: 'CivicLearn',
    category: 'Learning Platform',
    description:
      'A comprehensive learning platform for civic education in Indonesia based on AI Chatbot and Discussion Forum.',
    tech: ['React.js', 'Go', 'Tailwind', 'Supabase'],
    image: 'CivicLearn.webp',
    demo: 'https://civic-learn.vercel.app',
    github: 'https://github.com/dipndipp/CivicLearn',
  },
  {
    id: 3,
    title: 'UMKNext - Platform for Micro and Small Enterprises',
    category: 'Web Application',
    description:
      'A comprehensive platform for micro and small enterprises to manage and promote their business operations.',
    tech: ['TypeScript', 'OpenRouter', 'Tailwind', 'Framer Motion'],
    image: 'UMKNext.webp',
    demo: '#',
    github: '#',
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="projects" className="py-20">
      <FadeIn className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Featured <span className="text-accent">Projects</span>
        </h2>
      </FadeIn>

      <div className="grid lg:grid-cols-12 gap-8">

        {/* Project List */}
        <div className="lg:col-span-5 space-y-4">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.08} direction="up">
              <div
                onClick={() => setActiveProject(project)}
                className={cn(
                  'group cursor-pointer p-6 rounded-xl border transition-all duration-300 relative overflow-hidden',
                  activeProject.id === project.id
                    ? 'bg-white/10 border-accent/50 shadow-[0_0_20px_rgba(255,138,61,0.1)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10',
                )}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h3
                      className={cn(
                        'text-xl font-bold mb-1 transition-colors',
                        activeProject.id === project.id
                          ? 'text-accent'
                          : 'text-text-primary group-hover:text-white',
                      )}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{project.category}</p>
                  </div>
                  <ArrowRight
                    className={cn(
                      'transition-transform duration-300',
                      activeProject.id === project.id
                        ? 'text-accent translate-x-0'
                        : 'text-text-secondary -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                    )}
                  />
                </div>

                {/*
                  Active glow background.
                  layoutId lets Framer Motion FLIP-animate the glow across list items
                  — a pure transform + opacity move, no layout recalculation.
                */}
                {activeProject.id === project.id && (
                  <motion.div
                    layoutId="activeProjectGlow"
                    className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ willChange: 'transform, opacity' }}
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Project Preview */}
        <FadeIn direction="left" delay={0.2} className="lg:col-span-7 relative">
          {/*
            AnimatePresence fix:
            Old code used `x: ±20` on enter/exit which forced the browser to
            recalculate the overflow clip rect of the GlassPanel on every frame.
            Pure opacity transition means ONLY the Opacity step in the
            browser pipeline runs — zero Layout or Paint cost.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              // translateZ(0) isolates the switching panel in its own layer so
              // the surrounding DOM is not repainted when opacity changes.
              style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
              className="h-full"
            >
              <GlassPanel className="h-full p-2 overflow-hidden group">
                <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    // `will-change: transform` pre-promotes the image into its own
                    // layer — the hover scale runs entirely on the GPU compositor
                    // with zero repaint overhead.
                    style={{ willChange: 'transform' }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-3 z-10">
                    <a
                      href={activeProject.github}
                      className="p-3 glass-card rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={activeProject.demo}
                      className="p-3 glass-card rounded-full hover:bg-accent hover:text-white transition-colors text-accent bg-white/10"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <h3 className="text-2xl font-bold mb-3">{activeProject.title}</h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {activeProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>

          {/* Decorative glow — layer-promoted, pointer events off */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] -z-10 pointer-events-none"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
        </FadeIn>

      </div>
    </section>
  );
}
