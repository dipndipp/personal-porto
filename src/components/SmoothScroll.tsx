import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScroll wraps the app in a Lenis smooth-scroll engine.
 *
 * WHY: The browser's native scroll fires in discrete integer-pixel steps, which
 * causes Framer Motion's `whileInView` observer to trigger abruptly, producing
 * visible "pop-in" artifacts. Lenis drives scroll position through a continuous
 * `requestAnimationFrame` loop, so viewport intersections happen as floating-point
 * interpolations — giving every scroll-triggered animation a silky lead-in.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // Exponential ease — feels snappy at the start, glides to rest
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
