import { GlassPanel } from '../components/GlassPanel';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Download, Github, Linkedin } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

// GSAP removed — all animation now lives in Framer Motion so there is a
// single rAF driver. Mixing GSAP + Framer Motion created two competing
// animation loops, both calling requestAnimationFrame, doubling CPU overhead.

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-6xl">

        {/* Main Hero Card — entry handled by FadeIn (GPU-safe transform+opacity only) */}
        <FadeIn direction="up">
          <GlassPanel className="p-10 md:p-16 relative overflow-hidden">

            {/*
              Decorative blur blobs — promoted to their own compositor layers.
              WITHOUT translateZ(0): the browser re-paints the blobs on EVERY
              frame because they share a layer with the card.
              WITH it: they get their own GPU texture — zero repaint cost.
            */}
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-[100px] pointer-events-none"
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            />
            <div
              className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-light/10 to-transparent rounded-full blur-[80px] pointer-events-none"
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

              {/* Left Column — text content */}
              <div className="order-2 md:order-1">
                <FadeIn direction="left" delay={0.15}>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                    👋 Welcome to my portfolio
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                    Hi, I'm <br />
                    <span className="text-accent text-glow">Nadhif</span>
                  </h1>

                  <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-6">
                    Full-Stack Developer &amp; Designer
                  </h2>

                  <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-xl">
                    I craft elegant digital experiences with modern technologies.
                    Passionate about creating beautiful, functional, and user-centric
                    web applications that make a difference.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <a
                      href="#contact"
                      className="group px-6 py-3 accent-gradient text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                    >
                      Get In Touch
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="/ATS-MuhammadIhsanNadhif.pdf"
                      download="ATS - Muhammad Ihsan Nadhif.pdf"
                      className="px-6 py-3 bg-white/80 text-text-primary rounded-xl font-semibold border border-primary/10 hover:bg-white hover:border-accent/30 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                    >
                      <Download size={18} />
                      Download CV
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-4">
                    <p className="text-text-muted text-sm">Connect with me:</p>
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/dipndipp"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-lg bg-white/60 text-text-secondary hover:bg-white hover:text-accent transition-all hover:-translate-y-0.5"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dipnadipp/"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-lg bg-white/60 text-text-secondary hover:bg-white hover:text-accent transition-all hover:-translate-y-0.5"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href="mailto:nadhifworkmail@gmail.com"
                        className="p-2.5 rounded-lg bg-white/60 text-text-secondary hover:bg-white hover:text-accent transition-all hover:-translate-y-0.5"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column — floating profile image
                  GSAP `gsap.to(imageRef, { y: -15 })` caused layout reflows because
                  GSAP's default `y` shorthand writes `top` in some transform matrices.
                  Framer Motion's keyframe array animates the CSS `transform` matrix
                  directly — guaranteed compositor-only, zero layout cost.
              */}
              <div className="order-1 md:order-2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    // Keyframe float — pure transform, no layout reflow
                    y: [0, -15, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
                    scale:   { duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      // Start float only after the entry animation completes
                      delay: 1.1,
                    },
                  }}
                  // Promoted to its own GPU layer immediately — no promotion cost on first frame
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                  className="relative"
                >
                  {/* Glow ring behind the avatar */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light rounded-full blur-2xl opacity-20 animate-pulse-glow"
                    style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
                  />

                  {/* Profile image container */}
                  <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 p-1">
                    <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm overflow-hidden border-4 border-white/50 shadow-2xl">
                      <img
                        src="profile-img.webp"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Floating availability badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{ willChange: 'transform, opacity' }}
                    className="absolute -bottom-4 -right-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-accent/20"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                        style={{ willChange: 'opacity' }}
                      />
                      <span className="text-sm font-semibold text-text-primary">Available for work</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </GlassPanel>
        </FadeIn>

        {/* Quick Stats Row */}
        <FadeIn direction="up" delay={0.4} className="grid grid-cols-3 gap-4 mt-6">
          {[
            { value: '2+',  label: 'Years Experience' },
            { value: '20+', label: 'Projects Completed' },
            { value: '5+',  label: 'Certifications' },
          ].map((stat, i) => (
            <GlassPanel key={i} className="p-6 text-center hover:bg-white/90 transition-all group">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
            </GlassPanel>
          ))}
        </FadeIn>

      </div>
    </section>
  );
}
