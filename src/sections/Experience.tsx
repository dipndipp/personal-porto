import { GlassPanel } from '../components/GlassPanel';
import { FadeIn } from '../components/FadeIn';
import { Briefcase, Calendar } from 'lucide-react';

// `motion` import removed — FadeIn handles entry animation.
// Each timeline card was using `x: -20` which is a transform, but the
// inline `transition` object was missing a duration, causing Framer Motion
// to fall back to its default spring which overshoots and re-triggers layout.
// FadeIn uses a fixed cubic-bezier with no overshoot.

const experiences = [
   {
    id: 1,
    role: 'Coding Tutor',
    company: 'Timedoor Academy - Part Time',
    period: 'Feb 2026 - Present',
    description:
      'Supported the Business Development team in developing Pelindo Hub, a Digital Monitoring System for Indonesian National Seaports, converted Figma UI designs into responsive ReactJS components, and integrated APIs with effective data fetching and management to ensure optimal system performance.',
  },{
    id: 2,
    role: 'Front-End Developer',
    company: 'PT. Integrasi Logistik Cipta Solusi - Internship',
    period: 'Nov 2024 - Dec 2024',
    description:
      'Supported the Business Development team in developing Pelindo Hub, a Digital Monitoring System for Indonesian National Seaports, converted Figma UI designs into responsive ReactJS components, and integrated APIs with effective data fetching and management to ensure optimal system performance.',
  },
  {
    id: 3,
    role: 'Software Developer Trainee',
    company: 'PT. Integrasi Logistik Cipta Solusi - Internship',
    period: 'Oct 2024',
    description:
      "Adapted to and learned the company's tech stack to support digital product development, built a mini project using the same stack to strengthen practical understanding, and gained experience in code documentation and version control using GitLab.",
  },
  {
    id: 4,
    role: 'Digital Product Implementor & Agile Team',
    company: 'PT. Integrasi Logistik Cipta Solusi - Internship',
    period: 'Jun 2024 - Sep 2024',
    description:
      'Developed a Task Management System for the Human Resource division with automation features on the Lark platform, contributed within an Agile team to enhance task management and automation workflows for developers, and documented the implemented systems and mechanisms within the application.',
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <FadeIn className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Professional <span className="text-accent">Journey</span>
        </h2>
      </FadeIn>

      <div className="relative space-y-8">
        {/* Connector line — static, no animation cost */}
        <div className="absolute left-[28px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent via-accent/50 to-transparent hidden md:block" />

        {experiences.map((exp, index) => (
          <FadeIn
            key={exp.id}
            direction="left"
            delay={index * 0.1}
            className="relative md:pl-20"
          >
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 w-14 h-14 rounded-full glass-card border-accent/30 items-center justify-center z-10 hidden md:flex bg-background">
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#FF8A3D]" />
            </div>

            <GlassPanel className="p-8 hover:border-accent/30 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-text-secondary mt-1">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-white/5 w-fit">
                  <Calendar size={14} className="text-accent" />
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">{exp.description}</p>
            </GlassPanel>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
