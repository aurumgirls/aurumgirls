"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_ORGANIC: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * Reusable scroll-triggered fade-up reveal.
 * Matches the spec: translate-y-8 opacity-0 -> translate-y-0 opacity-100, ~800ms, organic easing.
 * Use `delay` to stagger sibling elements by 0.2s increments.
 */
export default function FadeUp({
  children,
  delay = 0,
  duration = 0.8,
  y = 32,
  className,
  once = true,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "span";
}) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE_ORGANIC, delay }}
    >
      {children}
    </MotionTag>
  );
}
