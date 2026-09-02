import { useCallback, useId, useMemo, useRef, useState } from "react";

type ToothShape = "incisor" | "canine" | "premolar" | "molar";

interface ToothDef {
  id: string;
  name: string;
  tip: string;
  shape: ToothShape;
  fdi: number;
}

/** Metade direita (FDI 11–17), do centro para trás. A esquerda espelha (21–27). */
const HALF_ARCH: Omit<ToothDef, "fdi">[] = [
  {
    id: "central",
    name: "Incisivo central",
    tip: "Define o eixo do sorriso e corta o alimento com precisão.",
    shape: "incisor",
  },
  {
    id: "lateral",
    name: "Incisivo lateral",
    tip: "Suaviza a transição e equilibra a linha do sorriso.",
    shape: "incisor",
  },
  {
    id: "canine",
    name: "Canino",
    tip: "O pilar do arco — guia a oclusão e dá caráter ao sorriso.",
    shape: "canine",
  },
  {
    id: "pm1",
    name: "1º pré-molar",
    tip: "Inicia a trituração e faz a ponte entre estética e função.",
    shape: "premolar",
  },
  {
    id: "pm2",
    name: "2º pré-molar",
    tip: "Refina a mastigação antes dos molares.",
    shape: "premolar",
  },
  {
    id: "m1",
    name: "1º molar",
    tip: "O maior triturador — base da mastigação e da oclusão.",
    shape: "molar",
  },
  {
    id: "m2",
    name: "2º molar",
    tip: "Fecha a arcada e distribui a carga mastigatória.",
    shape: "molar",
  },
];

const ARCH: (ToothDef & { key: string })[] = [
  ...[...HALF_ARCH]
    .reverse()
    .map((t, i) => ({ ...t, fdi: 17 - i, key: `${t.id}-esq` })),
  ...HALF_ARCH.map((t, i) => ({ ...t, fdi: 21 + i, key: `${t.id}-dir` })),
];

const SHAPE_SIZE: Record<ToothShape, { w: number; h: number }> = {
  incisor: { w: 22, h: 30 },
  canine: { w: 24, h: 36 },
  premolar: { w: 27, h: 32 },
  molar: { w: 38, h: 34 },
};

const CENTER_X = 320;
const TOP_Y = 72;
const RADIUS_X = 248;
const RADIUS_Y = 168;
const THETA_MAX = 86;

function toothPlacement(index: number, total: number) {
  const t = (index - (total - 1) / 2) / ((total - 1) / 2);
  const theta = t * THETA_MAX;
  const rad = (theta * Math.PI) / 180;
  const x = CENTER_X + RADIUS_X * Math.sin(rad);
  const y = TOP_Y + RADIUS_Y * (1 - Math.cos(rad));
  return { x, y, rotate: theta };
}

function archCurve(radiusX: number, radiusY: number, pad: number) {
  const steps = 56;
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 - 1;
    const theta = t * THETA_MAX;
    const rad = (theta * Math.PI) / 180;
    const x = CENTER_X + (radiusX + pad) * Math.sin(rad);
    const y = TOP_Y + (radiusY + pad * 0.72) * (1 - Math.cos(rad));
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return parts.join(" ");
}

function crownPath(shape: ToothShape, w: number, h: number): string {
  const hw = w / 2;
  const hh = h / 2;

  if (shape === "incisor") {
    const top = hw * 0.96;
    const bot = hw * 0.88;
    return [
      `M ${-top} ${-hh + 5}`,
      `Q ${-top} ${-hh} ${-top + 5} ${-hh}`,
      `L ${top - 5} ${-hh}`,
      `Q ${top} ${-hh} ${top} ${-hh + 5}`,
      `L ${bot} ${hh - 4.5}`,
      `Q ${bot} ${hh} ${bot - 4.5} ${hh}`,
      `L ${-bot + 4.5} ${hh}`,
      `Q ${-bot} ${hh} ${-bot} ${hh - 4.5}`,
      "Z",
    ].join(" ");
  }

  if (shape === "canine") {
    return [
      `M 0 ${-hh}`,
      `C ${hw * 0.55} ${-hh * 0.35} ${hw} ${-hh * 0.05} ${hw * 0.88} ${hh * 0.28}`,
      `Q ${hw * 0.55} ${hh} 0 ${hh}`,
      `Q ${-hw * 0.55} ${hh} ${-hw * 0.88} ${hh * 0.28}`,
      `C ${-hw} ${-hh * 0.05} ${-hw * 0.55} ${-hh * 0.35} 0 ${-hh}`,
      "Z",
    ].join(" ");
  }

  if (shape === "premolar") {
    const rB = hw * 0.92;
    const rL = hw * 0.78;
    const yB = -hh * 0.38;
    const yL = hh * 0.4;
    return [
      `M ${-rB} ${yB}`,
      `C ${-rB} ${yB - rB * 0.95} ${rB} ${yB - rB * 0.95} ${rB} ${yB}`,
      `C ${rB} ${yB + rB * 0.55} ${rL} ${yL - rL * 0.55} ${rL} ${yL}`,
      `C ${rL} ${yL + rL * 0.9} ${-rL} ${yL + rL * 0.9} ${-rL} ${yL}`,
      `C ${-rL} ${yL - rL * 0.55} ${-rB} ${yB + rB * 0.55} ${-rB} ${yB}`,
      "Z",
    ].join(" ");
  }

  const r = Math.min(hw, hh) * 0.38;
  const waist = hw * 0.9;
  return [
    `M ${-waist + r} ${-hh}`,
    `L ${waist - r} ${-hh}`,
    `Q ${waist} ${-hh} ${waist} ${-hh + r}`,
    `L ${hw} ${-r * 0.4}`,
    `Q ${hw} 0 ${hw * 0.96} ${r * 0.35}`,
    `L ${waist} ${hh - r}`,
    `Q ${waist} ${hh} ${waist - r} ${hh}`,
    `L ${-waist + r} ${hh}`,
    `Q ${-waist} ${hh} ${-waist} ${hh - r}`,
    `L ${-hw * 0.96} ${r * 0.35}`,
    `Q ${-hw} 0 ${-hw} ${-r * 0.4}`,
    `L ${-waist} ${-hh + r}`,
    `Q ${-waist} ${-hh} ${-waist + r} ${-hh}`,
    "Z",
  ].join(" ");
}

function Cusps({ shape, w, h, lit }: { shape: ToothShape; w: number; h: number; lit: boolean }) {
  const fill = lit ? "rgba(255,248,230,0.55)" : "rgba(255,255,255,0.35)";
  const stroke = lit ? "rgba(201,168,90,0.35)" : "rgba(176,148,118,0.28)";

  if (shape === "incisor") {
    return (
      <ellipse cx={0} cy={-h * 0.12} rx={w * 0.22} ry={h * 0.28} fill={fill} stroke={stroke} strokeWidth={0.6} />
    );
  }
  if (shape === "canine") {
    return (
      <ellipse cx={0} cy={-h * 0.18} rx={w * 0.18} ry={h * 0.22} fill={fill} stroke={stroke} strokeWidth={0.6} />
    );
  }
  if (shape === "premolar") {
    return (
      <>
        <ellipse cx={0} cy={-h * 0.28} rx={w * 0.28} ry={h * 0.2} fill={fill} stroke={stroke} strokeWidth={0.55} />
        <ellipse cx={0} cy={h * 0.26} rx={w * 0.24} ry={h * 0.18} fill={fill} stroke={stroke} strokeWidth={0.55} />
      </>
    );
  }
  const rx = w * 0.16;
  const ry = h * 0.15;
  return (
    <>
      <ellipse cx={-w * 0.2} cy={-h * 0.18} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={0.5} />
      <ellipse cx={w * 0.2} cy={-h * 0.18} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={0.5} />
      <ellipse cx={-w * 0.18} cy={h * 0.2} rx={rx * 0.9} ry={ry * 0.9} fill={fill} stroke={stroke} strokeWidth={0.5} />
      <ellipse cx={w * 0.18} cy={h * 0.2} rx={rx * 0.9} ry={ry * 0.9} fill={fill} stroke={stroke} strokeWidth={0.5} />
    </>
  );
}

export function DentalArch({ className }: { className?: string | undefined }) {
  const uid = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [pinnedKey, setPinnedKey] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ rx: 10, ry: 0 });
  const [light, setLight] = useState({ x: CENTER_X, y: 40 });

  const activeKey = pinnedKey ?? hoverKey;
  const active = ARCH.find((t) => t.key === activeKey) ?? null;

  const enamelId = `${uid}-enamel`;
  const enamelHotId = `${uid}-enamel-hot`;
  const gumId = `${uid}-gum`;
  const palateId = `${uid}-palate`;
  const liftId = `${uid}-lift`;

  const gumArc = useMemo(() => archCurve(RADIUS_X, RADIUS_Y, 4), []);
  const goldArc = useMemo(() => archCurve(RADIUS_X, RADIUS_Y, 34), []);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    if (stage) {
      const r = stage.getBoundingClientRect();
      const nx = (clientX - r.left) / r.width - 0.5;
      const ny = (clientY - r.top) / r.height - 0.5;
      setTilt({ rx: 10 - ny * 8, ry: nx * 12 });
    }
    if (svg) {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const p = pt.matrixTransform(ctm.inverse());
      setLight({ x: p.x, y: p.y });
    }
  }, []);

  const focusTooth = (index: number) => {
    const next = ARCH[(index + ARCH.length) % ARCH.length];
    if (!next) return;
    setPinnedKey(next.key);
    const el = svgRef.current?.querySelector(`[data-tooth="${next.key}"]`);
    if (el instanceof SVGElement) el.focus();
  };

  return (
    <div className={className}>
      <div
        ref={stageRef}
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-gold/20 bg-gradient-to-b from-[#1c1612] via-[#2a221c] to-[#3a2f26] px-3 py-6 sm:rounded-[2rem] sm:px-8 sm:py-8"
        onPointerMove={(e) => updatePointer(e.clientX, e.clientY)}
        onPointerLeave={() => {
          setTilt({ rx: 10, ry: 0 });
          setHoverKey(null);
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 70% 55% at ${((light.x / 640) * 100).toFixed(1)}% ${((light.y / 340) * 100).toFixed(1)}%, rgba(212,175,110,0.22), transparent 55%)`,
          }}
        />

        <p className="relative mb-1 text-[0.62rem] uppercase tracking-[0.32em] text-champagne/70">
          Vista oclusal · arcada superior
        </p>

        <div
          className="relative w-full max-w-3xl origin-center [transform-style:preserve-3d] motion-reduce:!transform-none"
          style={{
            transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: "transform 180ms ease-out",
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 640 340"
            className="relative w-full drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)]"
            role="img"
            aria-label="Ilustração interativa da arcada dentária superior. Selecione um dente para ver o nome e a função."
          >
            <defs>
              <linearGradient id={gumId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a39a" />
                <stop offset="55%" stopColor="#a56d68" />
                <stop offset="100%" stopColor="#7a4a48" />
              </linearGradient>
              <radialGradient id={palateId} cx="50%" cy="78%" r="55%">
                <stop offset="0%" stopColor="#4a3530" />
                <stop offset="70%" stopColor="#2c221e" />
                <stop offset="100%" stopColor="#1a1512" />
              </radialGradient>
              <linearGradient id={enamelId} x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#fffdf8" />
                <stop offset="42%" stopColor="#f4ebe0" />
                <stop offset="100%" stopColor="#d9c6b0" />
              </linearGradient>
              <linearGradient id={enamelHotId} x1="0.15" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#fff8e8" />
                <stop offset="45%" stopColor="#e8c97a" />
                <stop offset="100%" stopColor="#c4a056" />
              </linearGradient>
              <filter id={liftId} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#d4af6e" floodOpacity="0.6" />
              </filter>
            </defs>

            <ellipse cx={CENTER_X} cy={232} rx={196} ry={98} fill={`url(#${palateId})`} />
            <path
              d={goldArc}
              fill="none"
              stroke="rgba(212,175,110,0.28)"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
            <path
              d={gumArc}
              fill="none"
              stroke={`url(#${gumId})`}
              strokeWidth={46}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />

            {ARCH.map((tooth, i) => {
              const { x, y, rotate } = toothPlacement(i, ARCH.length);
              const { w, h } = SHAPE_SIZE[tooth.shape];
              const isActive = tooth.key === activeKey;
              const dimmed = Boolean(activeKey) && !isActive;
              const path = crownPath(tooth.shape, w, h);
              const extrude = isActive ? 7 : 3.4;
              const scale = isActive ? 1.18 : 1;

              return (
                <g
                  key={tooth.key}
                  data-tooth={tooth.key}
                  transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
                  opacity={dimmed ? 0.45 : 1}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    transition: "opacity 280ms ease",
                    filter: isActive ? `url(#${liftId})` : undefined,
                  }}
                  onMouseEnter={() => setHoverKey(tooth.key)}
                  onMouseLeave={() => setHoverKey((cur) => (cur === tooth.key ? null : cur))}
                  onFocus={() => setHoverKey(tooth.key)}
                  onBlur={() => setHoverKey((cur) => (cur === tooth.key ? null : cur))}
                  onClick={() => setPinnedKey((cur) => (cur === tooth.key ? null : tooth.key))}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      focusTooth(i + 1);
                    }
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      focusTooth(i - 1);
                    }
                    if (e.key === "Escape") {
                      setPinnedKey(null);
                      setHoverKey(null);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={pinnedKey === tooth.key}
                  aria-label={`${tooth.name} (FDI ${tooth.fdi}): ${tooth.tip}`}
                >
                  <path d={path} transform={`translate(1.6 ${extrude})`} fill={isActive ? "#8a6a32" : "#6b5340"} />
                  <path
                    d={path}
                    fill={isActive ? `url(#${enamelHotId})` : `url(#${enamelId})`}
                    stroke={isActive ? "#f0d48a" : "rgba(255,255,255,0.55)"}
                    strokeWidth={isActive ? 1.35 : 0.85}
                  />
                  <Cusps shape={tooth.shape} w={w} h={h} lit={isActive} />
                  <ellipse
                    cx={-w * 0.12}
                    cy={-h * 0.28}
                    rx={w * 0.22}
                    ry={h * 0.12}
                    fill="white"
                    opacity={isActive ? 0.45 : 0.22}
                    style={{ pointerEvents: "none" }}
                  />
                  {isActive && (
                    <>
                      <circle cy={h / 2 + 16} r={12} fill="#1a1512" opacity={0.85} />
                      <text
                        y={h / 2 + 20}
                        textAnchor="middle"
                        fill="#fff8e8"
                        fontSize={12}
                        fontWeight={500}
                        letterSpacing={1.2}
                        style={{ fontFamily: "Jost, sans-serif" }}
                      >
                        {tooth.fdi}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="relative mt-5 flex min-h-[7.5rem] w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-gold/50 bg-[#1c1612]/95 px-6 py-5 text-center shadow-[0_12px_40px_-14px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <span className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          {active ? (
            <>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-gold/70" />
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.3em] text-gold">FDI {active.fdi}</p>
                <span className="h-px w-6 bg-gold/70" />
              </div>
              <p className="mt-2 font-serif text-3xl italic text-[#fff8e8] sm:text-4xl">{active.name}</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#fff8e8]/90 sm:text-base">{active.tip}</p>
            </>
          ) : (
            <>
              <p className="font-serif text-xl italic text-[#fff8e8]/95 sm:text-2xl">Cada dente tem a sua história</p>
              <p className="mt-1 text-[0.8rem] uppercase tracking-[0.24em] text-gold/80">
                Toque ou passe o mouse para explorar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
