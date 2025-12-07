import { GlassPanel } from '../components/GlassPanel';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
  {
    id: 1,
    degree: 'Bachelor of Applied Data Science',
    institution: 'Politeknik Elektronika Negeri Surabaya',
    period: '2025 - Currently',
    description: 'Focused on Data Science and Machine Learning',
  },
  {
    id: 2,
    degree: 'High School Diploma : Software Engineering',
    institution: 'SMK Perguruan Cikini',
    period: '2022 - 2025',
    description: 'Focused on Software Engineering, Algorithms, and Data Structures',
  },
   {
    id: 3,
    degree: 'Course',
    institution: 'Timedoor Academy',
    period: '2022 - 2025',
    description: 'Focused on Website Development, Application Development, Machine Learning, and Data Science',
  }
];

export function Education() {
  return (
    <section id="education" className="py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic <span className="text-accent">Background</span></h2>
        <p className="text-text-secondary max-w-2xl">
          My educational journey that shaped my technical foundation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15 }}
          >
            <GlassPanel className="p-8 h-full hover:border-accent/30 transition-colors group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-text-secondary font-medium">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Calendar size={14} className="text-accent" />
                    <span className="text-text-secondary">{edu.period}</span>
                  </div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {edu.description}
              </p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
