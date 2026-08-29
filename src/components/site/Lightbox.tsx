import { useEffect } from "react";

export type LightboxImage = { src: string; alt: string };

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate(((index as number) - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onNavigate]);

  const current = index === null ? undefined : images[index];
  if (!open || !current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/90 px-4 py-10 animate-fade-in backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-colors duration-300 hover:border-gold hover:text-gold"
      >
        <span className="text-lg leading-none">×</span>
      </button>

      <figure onClick={(e) => e.stopPropagation()} className="max-h-full w-full max-w-5xl">
        <img
          src={current.src}
          alt={current.alt}
          className="mx-auto max-h-[76vh] w-auto rounded-[1.25rem] object-contain shadow-2xl animate-scale-in"
        />
        <figcaption className="mt-5 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate(((index as number) - 1 + images.length) % images.length)}
            aria-label="Imagem anterior"
            className="text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground/70 transition-colors hover:text-gold"
          >
            ← Anterior
          </button>
          <span className="text-[0.7rem] tracking-[0.2em] text-primary-foreground/50">
            {(index as number) + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => onNavigate(((index as number) + 1) % images.length)}
            aria-label="Próxima imagem"
            className="text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground/70 transition-colors hover:text-gold"
          >
            Próxima →
          </button>
        </figcaption>
      </figure>
    </div>
  );
}
