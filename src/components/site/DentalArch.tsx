import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const Scene = lazy(() => import("./DentalArchScene"));

export function DentalArch({ className }: { className?: string | undefined }) {
  return (
    <div className={className}>
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
