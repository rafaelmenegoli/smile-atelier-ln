import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Objeto "3D" de um dente, construído por extrusão de camadas SVG (sem WebGL).
 * — gira muito lentamente em loop
 * — no desktop, responde suavemente ao mouse (tilt/parallax)
 * — respeita prefers-reduced-motion
 */

const LAYERS = 16;
const DEPTH = 3.2; // px por camada

const TOOTH_PATH =
  "M50 8c-9 0-13 4-20 4S18 9 14 13c-5 5-6 14-4 25 1.6 8.6 3.4 13.4 5 22 1.4 7.6 2.2 16 3.4 22.6 1 5.6 3 8.4 6 8.4 3.4 0 5-3 6.2-9.4 1.2-6.6 2-16 4.4-19.4 1.2-1.8 3.4-2.8 5-2.8s3.8 1 5 2.8c2.4 3.4 3.2 12.8 4.4 19.4 1.2 6.4 2.8 9.4 6.2 9.4 3 0 5-2.8 6-8.4 1.2-6.6 2-15 3.4-22.6 1.6-8.6 3.4-13.4 5-22 2-11 1-20-4-25-4-4-9-1-16-1s-11-4-20-4z";

export function ToothObject({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = mq.matches && !reduced.matches;
    setFine(enabled);
    if (!enabled) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        setTilt({ x: Math.max(-1, Math.min(1, dy)) * -10, y: Math.max(-1, Math.min(1, dx)) * 14 });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none rounded-full border border-gold/30 bg-background/70 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] backdrop-blur-sm [perspective:1100px]",
        className,
      )}
    >
      <div
        className="h-full w-full transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: fine
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : undefined,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="tooth-spin" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: LAYERS }).map((_, i) => {
            const t = i / (LAYERS - 1);
            const z = (i - (LAYERS - 1) / 2) * DEPTH;
            const isFace = i === LAYERS - 1 || i === 0;
            return (
              <svg
                key={i}
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                style={{
                  transform: `translateZ(${z}px)`,
                  opacity: isFace ? 1 : 0.96,
                }}
              >
                <path
                  d={TOOTH_PATH}
                  fill={`color-mix(in oklab, white ${45 + t * 45}%, var(--nude))`}
                  stroke="color-mix(in oklab, var(--gold) 85%, transparent)"
                  strokeWidth={isFace ? 1.4 : 0.5}
                />
              </svg>
            );
          })}
          {/* brilho suave na face frontal */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            style={{ transform: `translateZ(${((LAYERS - 1) / 2) * DEPTH + 0.6}px)` }}
          >
            <defs>
              <linearGradient id="tooth-sheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                <stop offset="45%" stopColor="white" stopOpacity="0.06" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <clipPath id="tooth-clip">
                <path d={TOOTH_PATH} />
              </clipPath>
            </defs>
            <g clipPath="url(#tooth-clip)">
              <rect width="100" height="100" fill="url(#tooth-sheen)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
