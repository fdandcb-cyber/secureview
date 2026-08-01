import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-primary-50 text-primary-700 border-primary-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
