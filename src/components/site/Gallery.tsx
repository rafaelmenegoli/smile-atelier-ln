import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Lightbox, type LightboxImage } from "./Lightbox";

export function Gallery({ images }: { images: (LightboxImage & { className?: string })[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal
            key={img.alt}
            delay={i * 80}
            className={cn(img.className, i % 2 === 1 && "lg:mt-12")}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Ampliar imagem: ${img.alt}`}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={cn(
                  "w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                  ["h-[20rem] sm:h-[30rem]", "h-[20rem] sm:h-[22rem]", "h-[20rem] sm:h-[26rem]", "h-[20rem] sm:h-[24rem]"][i % 4],
                )}
              />

              <span className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/15" />
              <span className="absolute bottom-5 left-5 translate-y-2 text-[0.68rem] uppercase tracking-[0.2em] text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Ampliar
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
