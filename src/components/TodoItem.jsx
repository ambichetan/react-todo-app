import * as Checkbox from "@radix-ui/react-checkbox";
import * as Popover from "@radix-ui/react-popover";
import { useState, useRef, useEffect } from "react";
import {
  Pencil1Icon,
  TrashIcon,
  CheckIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

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

  const handleSave = () => {
    if (editText.trim()) {
      let datetime = "";
      if (selectedDate && selectedTime) {
        const [hours, minutes] = selectedTime.split(":");
        const date = new Date(selectedDate);
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        datetime = date.toISOString();
      }
      onEdit(editText, datetime);
      setIsEditing(false);
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const footer = (
    <div className="mt-4">
      <div className="flex flex-col gap-3">
        <div className="h-px bg-gray-200 dark:bg-gray-800 -mx-4" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-black dark:text-white">
            Time
          </span>
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="appearance-none rounded-lg px-3 py-1.5 text-sm bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 text-[#007AFF] dark:text-[#0A84FF] focus:outline-none focus:border-[#007AFF] dark:focus:border-[#0A84FF] transition-colors [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit]:font-medium"
          />
        </div>
      </div>
    </div>
  );

  const formatDateTime = (datetime) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <li className="group flex flex-wrap items-center gap-4 py-3 px-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        <Checkbox.Root
          className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-[#C7C7CC] dark:border-[#48484A] bg-white dark:bg-transparent hover:border-[#007AFF] dark:hover:border-[#0A84FF] data-[state=checked]:bg-[#007AFF] dark:data-[state=checked]:bg-[#0A84FF] data-[state=checked]:border-[#007AFF] dark:data-[state=checked]:border-[#0A84FF] transition-colors"
          checked={todo.completed}
          onCheckedChange={onToggle}
        >
          <Checkbox.Indicator className="text-white">
            <CheckIcon className="h-3 w-3" />
          </Checkbox.Indicator>
        </Checkbox.Root>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-lg px-3 py-2 text-base bg-[#F2F2F7] dark:bg-[#1C1C1E] border-0 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#007AFF] dark:focus:ring-[#0A84FF]"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span
            className={`flex-1 text-base ${
              todo.completed
                ? "text-[#8E8E93] dark:text-[#48484A] line-through"
                : "text-black dark:text-white"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        {isEditing ? (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="flex-1 rounded-lg px-3 py-2 text-base bg-[#F2F2F7] dark:bg-[#1C1C1E] text-left dark:text-white hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-colors flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-[#8E8E93] dark:text-[#48484A]" />
                <span>
                  {selectedDate
                    ? format(selectedDate, "MMM d, yyyy")
                    : "Select date"}
                  {selectedTime ? ` at ${selectedTime}` : ""}
                </span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="rounded-2xl bg-[#F2F2F7]/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl p-4 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-200"
                sideOffset={5}
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  footer={footer}
                  className="[&_.rdp]:p-0 [&_.rdp-months]:p-0 [&_.rdp-month]:p-0 [&_.rdp-day]:text-[#007AFF] dark:[&_.rdp-day]:text-[#0A84FF] [&_.rdp-day_focus]:bg-[#007AFF]/10 dark:[&_.rdp-day_focus]:bg-[#0A84FF]/10 [&_.rdp-day_active]:bg-[#007AFF] dark:[&_.rdp-day_active]:bg-[#0A84FF] [&_.rdp-day_active]:text-white [&_.rdp-day]:hover:bg-[#007AFF]/10 dark:[&_.rdp-day]:hover:bg-[#0A84FF]/10 [&_.rdp-day]:rounded-full [&_.rdp-head_cell]:text-[#8E8E93] dark:[&_.rdp-head_cell]:text-[#48484A] [&_.rdp-nav_button]:text-[#007AFF] dark:[&_.rdp-nav_button]:text-[#0A84FF] [&_.rdp-caption]:text-[#8E8E93] dark:[&_.rdp-caption]:text-[#48484A] [&_.rdp-nav]:p-0 [&_.rdp-caption]:p-0 [&_.rdp-head]:p-0 [&_.rdp-tbody]:gap-1 font-[-apple-system] [&_.rdp-head_cell]:font-semibold [&_.rdp-head_cell]:uppercase [&_.rdp-head_cell]:tracking-wider [&_.rdp-head_cell]:text-xs [&_.rdp-caption_label]:font-bold [&_.rdp-nav_button]:hover:bg-[#007AFF]/10 dark:[&_.rdp-nav_button]:hover:bg-[#0A84FF]/10 [&_.rdp-nav_button]:rounded-full [&_.rdp-nav_button]:p-1 [&_.rdp-day]:w-8 [&_.rdp-day]:h-8 [&_.rdp-day]:text-sm [&_.rdp-caption_label]:text-base [&_.rdp-day]:font-medium [&_.rdp-day_today]:font-bold [&_.rdp-day_outside]:opacity-30"
                />
                <Popover.Arrow className="fill-white dark:fill-[#1C1C1E]" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ) : (
          <span className="flex-1 text-sm text-[#8E8E93] dark:text-[#48484A]">
            {formatDateTime(todo.datetime)}
          </span>
        )}

        <div className="flex gap-3 opacity-100 md:opacity-0 transition-opacity group-hover:opacity-100 items-center">
          {isEditing ? (
            <button
              className="rounded-full p-1.5 text-[#34C759] dark:text-[#32D74B] hover:bg-[#34C759]/10 dark:hover:bg-[#32D74B]/10"
              onClick={handleSave}
            >
              <CheckIcon className="h-4 w-4" />
            </button>
          ) : (
            <button
              className="rounded-full p-1.5 text-[#007AFF] dark:text-[#0A84FF] hover:bg-[#007AFF]/10 dark:hover:bg-[#0A84FF]/10"
              onClick={() => setIsEditing(true)}
            >
              <Pencil1Icon className="h-4 w-4" />
            </button>
          )}
          <button
            className="rounded-full p-1.5 text-[#FF3B30] dark:text-[#FF453A] hover:bg-[#FF3B30]/10 dark:hover:bg-[#FF453A]/10"
            onClick={onDelete}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
