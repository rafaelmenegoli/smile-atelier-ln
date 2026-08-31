import dentalArch from "@/assets/dental-arch.jpg";

export function DentalArch({ className }: { className?: string | undefined }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden rounded-sm">
        <img
          src={dentalArch}
          alt="Ilustração clínica de uma arcada dentária em tons nude e champagne"
          loading="lazy"
          width={1280}
          height={1024}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
