"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_ORGANIC: [number, number, number, number] = [0.4, 0, 0.2, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_ORGANIC } },
};

/**
 * Wrap a group of siblings (each rendered via <StaggerItem>) to reveal them
 * in sequence, staggered by 0.2s, as they enter the viewport. Used for the
 * Hero headline/subhead/CTA, the 5-product Curated Collection grid, and the
 * Artisan card grids.
 */
export function StaggerGroup({
  children,
  className,
  once = true,
  amount = 0.2,
  staggerDelay = 0.2,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export { container as staggerContainerVariants, item as staggerItemVariants };
