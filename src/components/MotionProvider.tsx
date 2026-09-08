"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// framer-motion animates through inline styles, so the prefers-reduced-motion
// block in globals.css never reached it: a visitor asking for reduced motion
// still got every entrance animation. reducedMotion="user" makes every motion
// component in the tree honour the OS setting.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
