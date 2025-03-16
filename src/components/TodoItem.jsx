import { useState, useRef, useEffect } from "react";
import {
  Pencil1Icon,
  TrashIcon,
  CheckIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [selectedDate, setSelectedDate] = useState(
    todo.datetime ? new Date(todo.datetime) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(
    todo.datetime ? format(new Date(todo.datetime), "HH:mm") : ""
  );
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (selectedDate && !selectedTime) {
      setSelectedTime("12:00"); // Set default time when date is selected
    }
  }, [selectedDate]);

  const handleSave = () => {
    if (editText.trim()) {
      let datetime = "";
      if (selectedDate && selectedTime) {
        try {
          const [hours, minutes] = selectedTime.split(":");
          const date = new Date(selectedDate);
          date.setHours(parseInt(hours, 10));
          date.setMinutes(parseInt(minutes, 10));
          datetime = date.toISOString();
        } catch (e) {
          console.error("Error creating datetime:", e);
        }
      }
      onEdit(todo.id, editText, datetime);
      setIsEditing(false);
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const footer = (
    <div className="p-4 border-t border-border">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Time</span>
        <Input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-32"
        />
      </div>
    </div>
  );

  const formatDateTime = (datetime) => {
    if (!datetime) return "";
    try {
      const date = new Date(datetime);
      if (isNaN(date.getTime())) return ""; // Invalid date
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }).format(date);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };

  return (
    <li className="group flex flex-wrap items-center gap-4 py-3 px-3 border-b border-border">
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={onToggle}
            className="h-[22px] w-[22px] rounded-full"
          />

        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            className="flex-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span
            className={`flex-1 text-base ${
              todo.completed
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        {isEditing ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate
                  ? format(selectedDate, "MMM d, yyyy")
                  : "Select date"}
                {selectedTime ? ` at ${selectedTime}` : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
              {footer}
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {formatDateTime(todo.datetime) || "No date set"}
            </span>
          </div>
        )}

        <div className="flex gap-3 opacity-100 md:opacity-0 transition-opacity group-hover:opacity-100 items-center">
          {isEditing ? (
            <Button
              size="icon"
              variant="ghost"
              className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
              onClick={handleSave}
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="text-sky-500 hover:text-sky-600 hover:bg-sky-500/10"
              onClick={() => setIsEditing(true)}
            >
              <Pencil1Icon className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
            onClick={onDelete}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
