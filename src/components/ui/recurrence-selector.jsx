import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRotateRight } from "react-icons/fa6";

const RECURRENCE_OPTIONS = [
  { value: "none", label: "No repeat" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export function RecurrenceSelector({ value = "none", onChange }) {
  const selectedOption = RECURRENCE_OPTIONS.find(opt => opt.value === value) || RECURRENCE_OPTIONS[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 min-w-[120px]"
        >
          <FaRotateRight className="h-4 w-4" />
          {selectedOption.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="flex flex-col">
          {RECURRENCE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={value === option.value ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
