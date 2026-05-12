import { motion } from 'framer-motion';
import { ComponentProps, ReactNode, CSSProperties } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

// ComponentProps<typeof motion.div> is the correct way to type motion props
// in Framer Motion v11+ where HTMLMotionProps was removed.
interface FadeInProps extends Omit<ComponentProps<typeof motion.div>, 'style'> {
  children: ReactNode;
  /** Stagger offset in seconds. Default: 0 */
  delay?: number;
  /** Axis/direction of the entry movement. Default: 'up' */
  direction?: Direction;
  /** Pixel magnitude of the entry movement. Default: 28 */
  distance?: number;
  style?: CSSProperties;
}

const directionOffset = (direction: Direction, distance: number) => ({
  up:    { y: distance,  x: 0 },
  down:  { y: -distance, x: 0 },
  left:  { x: distance,  y: 0 },
  right: { x: -distance, y: 0 },
  none:  { x: 0,         y: 0 },
}[direction]);

/**
 * FadeIn — reusable GPU-safe scroll-entry wrapper.
 *
 * WHY this fixes jank:
 *  • Centralises viewport logic so every section shares a single
 *    IntersectionObserver pattern (once: true, margin: -100px).
 *  • Animates ONLY `opacity` + `transform` — the two properties the
 *    browser compositor can handle entirely on the GPU thread without
 *    triggering Layout or Paint.
 *  • `willChange: "transform, opacity"` promotes the element into its
 *    own composite layer *before* the animation starts, eliminating the
 *    first-frame jank caused by late promotion.
 *  • Custom cubic-bezier [0.21, 0.47, 0.32, 0.98] gives an
 *    Awwwards-quality "spring-like" ease that feels organic without
 *    the overhead of a real spring calculation.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  className,
  style,
  ...rest
}: FadeInProps) {
  const offset = directionOffset(direction, distance);

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      // Force element into its own GPU composite layer immediately
      style={{ willChange: 'transform, opacity', ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
