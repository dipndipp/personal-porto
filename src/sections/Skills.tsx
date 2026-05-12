import { GlassPanel } from '../components/GlassPanel';
import { FadeIn } from '../components/FadeIn';

// `motion` import dropped entirely — FadeIn handles all animation needs here.
// Removing the direct motion.div with `scale` transitions eliminates the
// Scale → Paint → Composite chain that caused repaints on every card entry.

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'And Other Libraries'],
  },
  {
    title: 'Backend',
    skills: ['Go', 'Node.js', 'Express', 'Python', 'Django', 'REST API'],
  },
  {
    title: 'Database & Cloud',
    skills: ['Oracle', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Firebase', 'Supabase'],
  },
  {
    title: 'Tools & Management',
    skills: ['Git', 'Figma', 'Notion', 'Lark'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16">

      {/* Section heading — single FadeIn, no per-word splits */}
      <FadeIn className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Technical <span className="text-accent">Stack</span>
        </h2>
        <p className="text-text-secondary max-w-2xl text-base">
          Tools and technologies used to build high-performance applications.
        </p>
      </FadeIn>

      {/*
        WHY scale: 0.95 → 1 was bad:
        Scaling a container that contains text triggers sub-pixel text re-rasterisation
        on every frame — an expensive Paint operation. Replacing with a pure
        translate (y: 28 → 0) means only the Composite step runs, keeping the
        GPU pipeline clean.
      */}
      <div className="grid md:grid-cols-2 gap-5">
        {skillCategories.map((category, index) => (
          <FadeIn
            key={category.title}
            delay={index * 0.08}
            direction="up"
          >
            <GlassPanel className="p-6 h-full hover:border-accent/30 hover:bg-white/90 transition-all">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent rounded-full shadow-md" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-3.5 py-2 rounded-lg bg-white/70 border border-primary/10 text-sm text-text-primary font-medium hover:text-accent hover:bg-white hover:border-accent/30 transition-all cursor-default hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
