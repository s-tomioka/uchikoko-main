"use client";

import { cn } from "@/lib/utils";
import { makeHashScrollHandler } from "@/lib/interactive";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "text";

interface ButtonBaseProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };
type ButtonAsLink = ButtonBaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-dark text-white hover:bg-dark/85 active:bg-dark/90",
  outline:
    "bg-transparent text-foreground border border-foreground/20 hover:border-foreground/45 hover:bg-black/[0.02] active:bg-black/[0.04]",
  text: "bg-transparent text-text-muted underline underline-offset-4 decoration-border hover:decoration-foreground/40 hover:text-foreground",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-7 py-3 text-[12px] tracking-[0.06em] font-medium transition-all cursor-pointer",
    focusRing,
    variantStyles[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, onClick, ...rest } = props as ButtonAsLink;
    const isHashLink = typeof href === "string" && href.includes("#");
    return (
      <Link
        href={href}
        className={classes}
        {...rest}
        onClick={
          isHashLink
            ? makeHashScrollHandler(href as string, onClick)
            : onClick
        }
      />
    );
  }

  return <button className={classes} {...(props as ButtonAsButton)} />;
}
