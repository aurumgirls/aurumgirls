"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { EASE_ORGANIC, useReveal, type RevealTrigger } from "./useReveal";

const GENTLE_STYLE: CSSProperties = { transition: "opacity 200ms ease" };

/**
 * Reusable fade-up reveal: translate-y-8 opacity-0 -> translate-y-0 opacity-100.
 * Defaults to revealing on scroll; pass trigger="mount" for above-the-fold
 * content that should never wait for an intersection to fire.
 * Use `delay` to stagger sibling elements.
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
  trigger = "view",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "span";
  trigger?: RevealTrigger;
}) {
  const { ref, visible, motionMode } = useReveal<HTMLElement>({
    trigger,
    once,
    amount,
  });

  // rAF is broken: framer-motion (and any JS-driven transition) commits values
  // on a frame callback, so even duration:0 would strand the element at its
  // initial opacity forever. Skip straight to the final, fully-visible markup.
  if (motionMode === "none") {
    return as === "span" ? (
      <span className={className}>{children}</span>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  // prefers-reduced-motion, but rAF works: reduced motion means fewer and
  // gentler animations, not zero. Keep a short opacity-only fade — driven by
  // the browser's own compositor via a plain CSS transition, not
  // framer-motion — and drop the translate.
  if (motionMode === "gentle") {
    const style = { ...GENTLE_STYLE, opacity: visible ? 1 : 0 };
    return as === "span" ? (
      <span ref={ref as RefObject<HTMLSpanElement>} className={className} style={style}>
        {children}
      </span>
    ) : (
      <div ref={ref as RefObject<HTMLDivElement>} className={className} style={style}>
        {children}
      </div>
    );
  }

  const transition = { duration, ease: EASE_ORGANIC, delay };
  const hidden = { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };

  if (as === "span") {
    return (
      <motion.span
        ref={ref as RefObject<HTMLSpanElement>}
        className={className}
        initial={hidden}
        animate={visible ? shown : hidden}
        transition={transition}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
