import React from "react";
import { cn } from "@/lib/utils";

const priorityColors = {
  high: "text-red-500 bg-red-100 dark:bg-red-900/20",
  medium: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20",
  low: "text-green-500 bg-green-100 dark:bg-green-900/20",
};

const priorityIcons = {
  high: "!!!",
  medium: "!!",
  low: "!",
};

export function PrioritySelector({ value = "medium", onChange, className }) {
  return (
    <div className={cn("flex items-center gap-3 h-fit", className)}>
      {Object.entries(priorityColors).map(([priority, colorClass]) => (
        <button
          key={priority}
          onClick={() => onChange(priority)}
          className={cn(
            "px-2 py-0.5 rounded-md font-medium transition-colors",
            colorClass,
            value === priority
              ? "ring-2 ring-offset-2"
              : "opacity-70 hover:opacity-100"
          )}
          aria-label={`Set priority to ${priority}`}
        >
          {priorityIcons[priority]}
        </button>
      ))}
    </div>
  );
}

export function PriorityBadge({ priority = "medium", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center shrink-0 px-2 py-0.5 rounded text-xs font-medium",
        priorityColors[priority],
        className
      )}
    >
      {priorityIcons[priority]}
    </span>
  );
}
