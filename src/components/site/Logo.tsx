import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-serif tracking-[0.18em] text-foreground",
          compact ? "text-xl" : "text-2xl",
        )}
      >
        LN
      </span>
      <span
        className={cn(
          "mt-1 uppercase text-muted-foreground",
          compact ? "text-[0.5rem] tracking-[0.26em]" : "text-[0.5625rem] tracking-[0.3em]",
        )}
      >
        Odontologia Especializada
      </span>
    </span>
  );
}
