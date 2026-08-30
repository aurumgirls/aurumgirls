"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { EASE_ORGANIC, useMotionMode } from "./useReveal";

const GENTLE_DURATION_MS = 150;

/**
 * Trigger-anchored popover/dropdown entrance: scale + fade from the edge the
 * trigger sits on, never from center (that's reserved for modals). Used for
 * absolute-positioned menus (sort dropdown, nav dropdown) so they read as
 * coming from the button that opened them rather than teleporting in.
 */
export function PopIn({
  show,
  origin = "top right",
  duration = 0.18,
  className,
  children,
}: {
  show: boolean;
  origin?: CSSProperties["transformOrigin"];
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const motionMode = useMotionMode();

  if (motionMode === "none") {
    return show ? <div className={className}>{children}</div> : null;
  }

  // Reduced motion, rAF fine: keep a quick opacity-only fade via plain CSS —
  // drop the scale (that's the "movement" reduced motion asks to lose), keep
  // the fade (it aids comprehension of the state change).
  if (motionMode === "gentle") {
    return show ? (
      <div
        className={className}
        style={{ transition: `opacity ${GENTLE_DURATION_MS}ms ease`, opacity: 1 }}
      >
        {children}
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={className}
          style={{ transformOrigin: origin }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration, ease: EASE_ORGANIC }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
