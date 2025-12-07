import { GlassPanel } from '../components/GlassPanel';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Front-End Developer',
    company: 'PT. Integrasi Logistik Cipta Solusi - Internship',
    period: 'Nov 2025 - Dec 2025',
    description: 'Supported the Business Development team in developing Pelindo Hub, a Digital Monitoring System for Indonesian National Seaports, converted Figma UI designs into responsive ReactJS components, and integrated APIs with effective data fetching and management to ensure optimal system performance.',
  },
  {
    id: 2,
    role: 'Software Developer Trainee',
    company: 'PT. Integrasi Logistik Cipta Solusi - Internship',
    period: 'Oct 2025',
    description: 'Adapted to and learned the company’s tech stack to support digital product development, built a mini project using the same stack to strengthen practical understanding, and gained experience in code documentation and version control using GitLab.',
  },
  {
    id: 3,
    role: 'Digital Product Implementor & Agile Team',
    company: 'PT. Integrasi Logistik Cipta Solusi - Internship',
    period: 'Jun 2025 - Sep 2025',
    description: 'Developed a Task Management System for the Human Resource division with automation features on the Lark platform, contributed within an Agile team to enhance task management and automation workflows for developers, and documented the implemented systems and mechanisms within the application.',
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional <span className="text-accent">Journey</span></h2>
      </div>

      <div className="relative space-y-8">
        {/* Connector Line */}
        <div className="absolute left-[28px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent via-accent/50 to-transparent hidden md:block" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className="relative md:pl-20"
          >
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 w-14 h-14 rounded-full glass-card border-accent/30 flex items-center justify-center z-10 hidden md:flex bg-background">
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#FF8A3D]" />
            </div>

            <GlassPanel className="p-8 hover:border-accent/30 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{exp.role}</h3>
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
              <p className="text-text-secondary leading-relaxed">
                {exp.description}
              </p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
