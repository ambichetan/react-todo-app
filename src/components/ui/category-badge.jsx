import React from "react";
import { cn } from "@/lib/utils";

export function CategoryBadge({ category, className, ...props }) {
  if (!category) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        "transition-colors",
        className
      )}
      style={{
        backgroundColor: `${category.color}15`, // 15 is hex for 10% opacity
        color: category.color,
        borderColor: `${category.color}30`, // 30 is hex for 20% opacity
      }}
      {...props}
    >
      <span
        className="mr-1 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: category.color }}
      />
      {category.name}
    </span>
  );
}
