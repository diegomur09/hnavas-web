"use client";

import { useEffect, useRef } from "react";
import { assetUrl } from "@/lib/site";

/**
 * "Soul Diego" — a transparent full-body character that subtly turns to follow
 * the cursor. The effect is a 3D parallax: as the pointer moves across the
 * viewport the figure rotates (perspective rotateX/rotateY) and drifts a few
 * pixels toward it, so it reads as "watching you". Motion is eased every frame
 * with requestAnimationFrame for a smooth, premium feel.
 *
 * Purely decorative: pointer-events-none (never blocks clicks), aria-hidden,
 * and fully disabled under prefers-reduced-motion.
 */
export function CursorCharacter({
  className = "",
  src = "/diego-character.webp",
  intensity = 1,
  priority = false,
  glow = true,
}: {
  className?: string;
  src?: string;
  /** Scales the tilt/drift. 1 = default, lower = subtler. */
  intensity?: number;
  priority?: boolean;
  glow?: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      // Normalized −1..1 from the viewport center.
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      // Critically-damped easing toward the target each frame.
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      const ry = curX * 11 * intensity; // turn left/right toward cursor
      const rx = -curY * 6 * intensity; // tip up/down toward cursor
      const tx = curX * 16 * intensity; // lateral drift
      const ty = curY * 9 * intensity; // vertical drift

      img.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ perspective: "1200px" }}
    >
      {glow && (
        <div
          className="absolute left-1/2 top-1/2 -z-10 h-[78%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--color-brand-500) 32%, transparent), color-mix(in oklab, var(--color-violet-500) 16%, transparent) 55%, transparent 72%)",
          }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={assetUrl(src)}
        alt=""
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-contain object-bottom will-change-transform"
        style={{ transformStyle: "preserve-3d", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55))" }}
      />
    </div>
  );
}
