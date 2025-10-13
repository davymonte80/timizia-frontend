// components/carousel-dots.tsx
import React from "react";
import { Button } from "@/components/ui/button";

export type DotButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** whether this dot represents the active slide */
  active?: boolean;
  /** zero-based index of the slide (used for aria-label) */
  index?: number;
  /** optional label override for accessibility */
  label?: string;
};

export const DotButton: React.FC<DotButtonProps> = ({
  active = false,
  index,
  label,
  className = "",
  ...props
}) => {
  // Many shadcn button implementations accept a `variant` prop.
  // If yours doesn't, remove `variant` and rely on `className` below.
  return (
    <Button
      type="button"
      // prefer a compact variant for dots; change if your Button uses different API
      variant={active ? "default" : "ghost"}
      aria-pressed={active}
      aria-label={label ?? (index !== undefined ? `Go to slide ${index + 1}` : "Go to slide")}
      // small round dot appearance — tweak sizes to taste
      className={`h-3 w-3 rounded-full p-0 inline-flex items-center justify-center transition-transform duration-150 ${
        active ? "scale-110" : "opacity-70 hover:opacity-100"
      } ${className}`}
      {...props}
    />
  );
};

export default DotButton;
