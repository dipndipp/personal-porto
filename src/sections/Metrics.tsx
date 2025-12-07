import { GlassPanel } from '../components/GlassPanel';
import { motion } from 'framer-motion';
import { Code2, Users, Briefcase, Layers } from 'lucide-react';

const metrics = [
  { label: 'Total Projects', value: '20+', icon: Layers, accent: false },
  { label: 'Years Experience', value: '2+', icon: Briefcase, accent: true },
  { label: 'Certifications', value: '5+', icon: Users, accent: false },
  { label: 'Tech Stack', value: '10+', icon: Code2, accent: false },
];

export function Metrics() {
  return (
    <section className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassPanel className="p-6 flex flex-col items-center justify-center text-center hover:bg-white/90 transition-all group relative overflow-hidden border hover:border-accent/30">
              <div className={`mb-3 p-3 rounded-xl ${metric.accent ? 'bg-accent/15 text-accent shadow-md' : 'bg-white/60 text-text-secondary group-hover:text-accent group-hover:bg-white/80'} transition-all`}>
                <metric.icon size={24} strokeWidth={metric.accent ? 2 : 1.5} />
              </div>
              <h3 className={`text-3xl font-bold mb-2 ${metric.accent ? 'text-accent' : 'text-text-primary'}`}>
                {metric.value}
              </h3>
              <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                {metric.label}
              </p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
