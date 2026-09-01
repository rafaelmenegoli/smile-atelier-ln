import { useState } from "react";

type ToothShape = "incisor" | "canine" | "premolar" | "molar";

interface ToothDef {
  id: string;
  name: string;
  tip: string;
  shape: ToothShape;
}

// Metade direita da arcada, do centro para trás. A metade esquerda é um espelho.
const HALF_ARCH: ToothDef[] = [
  {
    id: "central",
    name: "Incisivo central",
    tip: "Corta o alimento com precisão — o protagonista do sorriso.",
    shape: "incisor",
  },
  {
    id: "lateral",
    name: "Incisivo lateral",
    tip: "Complementa o corte e dá equilíbrio à linha do sorriso.",
    shape: "incisor",
  },
  {
    id: "canine",
    name: "Canino",
    tip: "O mais resistente do arco — rasga com firmeza.",
    shape: "canine",
  },
  {
    id: "pm1",
    name: "1º pré-molar",
    tip: "Inicia a trituração, fazendo a transição para os molares.",
    shape: "premolar",
  },
  {
    id: "pm2",
    name: "2º pré-molar",
    tip: "Refina a trituração antes de chegar aos molares.",
    shape: "premolar",
  },
  {
    id: "m1",
    name: "1º molar",
    tip: "O maior triturador — base de toda a mastigação.",
    shape: "molar",
  },
  {
    id: "m2",
    name: "2º molar",
    tip: "Finaliza a trituração antes da deglutição.",
    shape: "molar",
  },
];

const ARCH: (ToothDef & { key: string })[] = [
  ...[...HALF_ARCH].reverse().map((t) => ({ ...t, key: `${t.id}-esq` })),
  ...HALF_ARCH.map((t) => ({ ...t, key: `${t.id}-dir` })),
];

const SHAPE_SIZE: Record<ToothShape, { w: number; h: number }> = {
  incisor: { w: 22, h: 32 },
  canine: { w: 23, h: 35 },
  premolar: { w: 26, h: 30 },
  molar: { w: 32, h: 30 },
};

const CENTER_X = 220;
const TOP_Y = 56;
const RADIUS_X = 168;
const RADIUS_Y = 128;
const THETA_MAX = 82; // graus, abertura total do arco

function toothPlacement(index: number, total: number) {
  const t = (index - (total - 1) / 2) / ((total - 1) / 2); // -1..1
  const theta = t * THETA_MAX;
  const rad = (theta * Math.PI) / 180;
  const x = CENTER_X + RADIUS_X * Math.sin(rad);
  const y = TOP_Y + RADIUS_Y * (1 - Math.cos(rad));
  return { x, y, rotate: theta };
}

export function DentalArch({ className }: { className?: string | undefined }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = ARCH.find((t) => t.key === activeKey) ?? null;

  return (
    <div className={className}>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-sm bg-gradient-to-b from-champagne/70 via-sand to-nude/40 px-4 py-8 sm:px-10">
        <svg
          viewBox="0 0 440 240"
          className="w-full max-w-xl"
          role="img"
          aria-label="Ilustração interativa de uma arcada dentária superior. Passe o mouse ou toque em cada dente para ver seu nome e função."
        >
          {ARCH.map((tooth, i) => {
            const { x, y, rotate } = toothPlacement(i, ARCH.length);
            const { w, h } = SHAPE_SIZE[tooth.shape];
            const isActive = tooth.key === activeKey;
            const scale = isActive ? 1.12 : 1;

            return (
              <g
                key={tooth.key}
                transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActiveKey(tooth.key)}
                onMouseLeave={() => setActiveKey((cur) => (cur === tooth.key ? null : cur))}
                onFocus={() => setActiveKey(tooth.key)}
                onBlur={() => setActiveKey((cur) => (cur === tooth.key ? null : cur))}
                onClick={() => setActiveKey((cur) => (cur === tooth.key ? null : tooth.key))}
                tabIndex={0}
                role="button"
                aria-label={`${tooth.name}: ${tooth.tip}`}
              >
                <rect
                  x={-w / 2}
                  y={-h / 2}
                  width={w}
                  height={h}
                  rx={tooth.shape === "molar" ? w / 4 : w / 2.6}
                  fill={isActive ? "var(--color-gold)" : "#fffdf8"}
                  stroke={isActive ? "var(--color-gold)" : "var(--color-nude)"}
                  strokeWidth={1.25}
                  style={{ transition: "fill 260ms ease, stroke 260ms ease" }}
                />
                {tooth.shape !== "incisor" && (
                  <line
                    x1={0}
                    y1={-h / 4}
                    x2={0}
                    y2={h / 4}
                    stroke="var(--color-nude)"
                    strokeWidth={0.9}
                    opacity={isActive ? 0.3 : 0.7}
                  />
                )}
              </g>
            );
          })}
        </svg>

        <div className="mt-4 flex h-[3.5rem] flex-col items-center justify-center px-4 text-center">
          {active ? (
            <>
              <p className="font-serif text-lg italic text-gold">{active.name}</p>
              <p className="mt-1 text-[0.8rem] leading-snug text-muted-foreground">{active.tip}</p>
            </>
          ) : (
            <p className="eyebrow">Passe o mouse ou toque em um dente</p>
          )}
        </div>
      </div>
    </div>
  );
}
