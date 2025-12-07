import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            N
          </div>
          <span className="text-text-secondary text-sm">
            © 2025 Nadhif. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="text-text-secondary hover:text-white transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
         
        </div>
      </div>
    </footer>
  );
}
