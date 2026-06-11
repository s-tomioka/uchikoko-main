import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  aspect?: "video" | "square" | "portrait";
}

export function ImagePlaceholder({ label, className, aspect }: ImagePlaceholderProps) {
  const aspectClass = aspect === "square"
    ? "aspect-square"
    : aspect === "portrait"
    ? "aspect-[3/4]"
    : "";

  return (
    <div
      className={cn(
        "bg-placeholder rounded-sm overflow-hidden flex items-end justify-start",
        aspectClass,
        className,
      )}
    >
      {label && (
        <span className="text-[10px] text-text-faint px-3 py-2 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
