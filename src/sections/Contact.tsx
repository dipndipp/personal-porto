import { GlassPanel } from '../components/GlassPanel';
import { motion } from 'framer-motion';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function Contact() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"project-opportunities"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#4b4b4b"}, "dark":{"cal-brand":"#4b4b4b"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <section id="contact" className="py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's <span className="text-accent">Connect</span></h2>
        <p className="text-text-secondary max-w-2xl">
          Ready to start your next project? Schedule a call directly via my calendar.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-[700px] w-full"
      >
        <GlassPanel className="h-full w-full overflow-hidden p-0 bg-white/50">
          <Cal 
            namespace="project-opportunities"
            calLink="dipnadipp/project-opportunities"
            style={{width:"100%",height:"100%",overflow:"scroll"}}
            config={{"layout":"month_view"}}
          />
        </GlassPanel>
      </motion.div>
    </section>
  );
}
