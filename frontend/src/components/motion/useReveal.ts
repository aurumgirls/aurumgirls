"use client";

import { useRef, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** The single easing curve shared by CSS (--e-organic) and every JS transition. */
export const EASE_ORGANIC: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * Reveals depend on two browser capabilities that are not always actually
 * functional, even when the APIs exist:
 *
 *  - IntersectionObserver may be present but never invoke its callback, which
 *    would strand scroll-revealed content at opacity 0 forever.
 *  - requestAnimationFrame may never tick (throttled webviews, power saving),
 *    which freezes a JS-driven animation partway through.
 *
 * Both are probed once per page load. Content visibility must never depend on
 * an animation loop actually running, so a failed probe degrades to "render it
 * plainly" rather than leaving anything half-faded.
 */
const PROBE_TIMEOUT_MS = 500;
const RAF_PROBE_TIMEOUT_MS = 150;

type Capabilities = { observer: boolean; raf: boolean };

let capabilities: Capabilities = { observer: true, raf: true };
let probeStarted = false;
const subscribers = new Set<() => void>();

function updateCapabilities(patch: Partial<Capabilities>) {
  const next = { ...capabilities, ...patch };
  if (next.observer === capabilities.observer && next.raf === capabilities.raf) return;
  capabilities = next;
  subscribers.forEach((notify) => notify());
}

function probeObserver() {
  if (typeof IntersectionObserver !== "function") {
    updateCapabilities({ observer: false });
    return;
  }

  let reported = false;
  const observer = new IntersectionObserver(() => {
    reported = true;
    observer.disconnect();
  });

  observer.observe(document.body);

  window.setTimeout(() => {
    if (reported) return;
    observer.disconnect();
    updateCapabilities({ observer: false });
  }, PROBE_TIMEOUT_MS);
}

function probeRaf() {
  if (typeof requestAnimationFrame !== "function") {
    updateCapabilities({ raf: false });
    return;
  }

  let ticked = false;
  requestAnimationFrame(() => {
    ticked = true;
  });

  window.setTimeout(() => {
    if (!ticked) updateCapabilities({ raf: false });
  }, RAF_PROBE_TIMEOUT_MS);
}

function startProbe() {
  if (probeStarted || typeof window === "undefined") return;
  probeStarted = true;
  probeObserver();
  probeRaf();
}

function subscribe(notify: () => void) {
  subscribers.add(notify);
  startProbe();
  return () => {
    subscribers.delete(notify);
  };
}

const SERVER_CAPABILITIES: Capabilities = { observer: true, raf: true };

function useCapabilities() {
  return useSyncExternalStore(
    subscribe,
    () => capabilities,
    () => SERVER_CAPABILITIES,
  );
}

const neverNotify = () => () => {};

/**
 * True once this render is happening on the client, past hydration. Built on
 * useSyncExternalStore rather than the common `useState(false)` +
 * `useEffect(() => setState(true))` pattern — that pattern calls setState
 * synchronously from an effect body, which triggers an extra cascading
 * render; "mounted-ness" never changes after the fact, so subscribe is a
 * no-op and only the two snapshots (server vs. client) differ.
 */
function useHasMounted() {
  return useSyncExternalStore(neverNotify, () => true, () => false);
}

export type RevealTrigger = "view" | "mount";

export type RevealOptions = {
  /** "mount" reveals as soon as the component hydrates — use it above the fold. */
  trigger?: RevealTrigger;
  once?: boolean;
  amount?: number;
};

/**
 * Three distinct motion modes, not a single on/off switch:
 *
 *  - "full": framer-motion runs as authored (translate + fade, springs, etc).
 *  - "gentle": prefers-reduced-motion is on, but rAF works fine. Reduced motion
 *    means fewer and gentler animations, not zero — a plain CSS opacity fade
 *    (no framer-motion, no movement) still runs, driven by the browser's own
 *    compositor rather than a frame callback.
 *  - "none": rAF itself is broken, so framer-motion (and any JS-driven
 *    transition) can never commit a value — even a fade would strand content
 *    at its initial opacity forever. Skip straight to the end state.
 */
export type MotionMode = "full" | "gentle" | "none";

function computeMotionMode(prefersReducedMotion: boolean | null, rafWorks: boolean): MotionMode {
  if (!rafWorks) return "none";
  if (prefersReducedMotion) return "gentle";
  return "full";
}

/**
 * Shared visibility logic for FadeUp and StaggerGroup so both animate off the
 * same rules: honours prefers-reduced-motion, reveals immediately when asked to
 * trigger on mount, and never leaves content hidden if the observer misbehaves.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  trigger = "view",
  once = true,
  amount = 0.2,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();
  const { observer: observerWorks, raf: rafWorks } = useCapabilities();
  const hasMounted = useHasMounted();

  const motionMode = computeMotionMode(prefersReducedMotion, rafWorks);
  const visible =
    motionMode === "none" ||
    !observerWorks ||
    (trigger === "mount" ? hasMounted : inView);

  return { ref, visible, motionMode };
}

/** Whether — and how — motion should run. See {@link MotionMode}. */
export function useMotionMode(): MotionMode {
  const prefersReducedMotion = useReducedMotion();
  const { raf } = useCapabilities();
  return computeMotionMode(prefersReducedMotion, raf);
}
