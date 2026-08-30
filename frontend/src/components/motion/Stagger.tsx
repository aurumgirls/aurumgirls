"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { EASE_ORGANIC, useMotionMode, useReveal, type RevealTrigger } from "./useReveal";

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

const GENTLE_STYLE: CSSProperties = { transition: "opacity 200ms ease" };

/**
 * Wrap a group of siblings (each rendered via <StaggerItem>) to reveal them
 * in sequence as they enter the viewport. Children must be <StaggerItem> —
 * a child that sets its own initial/animate opts out of the stagger.
 */
export function StaggerGroup({
  children,
  className,
  once = true,
  amount = 0.2,
  staggerDelay = 0.2,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  staggerDelay?: number;
  trigger?: RevealTrigger;
}) {
  const { ref, visible, motionMode } = useReveal<HTMLDivElement>({
    trigger,
    once,
    amount,
  });

  // rAF broken: see FadeUp — framer-motion can't commit values, skip straight
  // to the final markup.
  if (motionMode === "none") {
    return <div className={className}>{children}</div>;
  }

  // Reduced motion, rAF fine: fade the group in as one unit via plain CSS
  // instead of staggering each item — the per-item sequencing is the
  // decorative part, and reduced motion drops decoration, not the fade itself.
  if (motionMode === "gentle") {
    return (
      <div ref={ref} className={className} style={{ ...GENTLE_STYLE, opacity: visible ? 1 : 0 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const motionMode = useMotionMode();

  // In both fallback modes the parent (StaggerGroup) already handles
  // visibility — instantly in "none", as a single group-level fade in
  // "gentle" — so the item itself just renders plainly.
  if (motionMode !== "full") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export { container as staggerContainerVariants, item as staggerItemVariants };
