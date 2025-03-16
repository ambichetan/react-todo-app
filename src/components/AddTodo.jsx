import { useState, useRef, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useTodoContext } from "../context/TodoContext";
import { FaPlus } from "react-icons/fa";

function AddTodo() {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const { addTodo } = useTodoContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      let datetime = "";
      if (selectedDate && selectedTime) {
        const [hours, minutes] = selectedTime.split(":");
        const date = new Date(selectedDate);
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        datetime = date.toISOString();
      }
      addTodo(text, datetime);
      setText("");
      setSelectedDate(undefined);
      setSelectedTime("");
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

  return (
    <form className="flex flex-wrap gap-3 mb-6" onSubmit={handleSubmit}>
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          className="w-full rounded-lg px-4 py-3 text-base bg-[#F2F2F7] dark:bg-[#1C1C1E] text-black dark:text-white placeholder-[#8E8E93] dark:placeholder-[#48484A] focus:outline-none focus:ring-2 focus:ring-[#007AFF] dark:focus:ring-[#0A84FF] transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Reminder"
          aria-label="Add a new reminder"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
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
      </div>
      <button
        type="submit"
        className="bg-[#007AFF] hover:bg-[#007AFF]/90 dark:bg-[#0A84FF] dark:hover:bg-[#0A84FF]/90 text-white rounded-full w-10 h-10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="Add reminder"
        disabled={!text.trim()}
      >
        <FaPlus />
      </button>
    </form>
  );
}

export default AddTodo;
