import { useState, useEffect, useRef } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useTodoContext } from "../context/TodoContext";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CategorySelector from "@/components/CategorySelector";
import { PrioritySelector } from "@/components/ui/priority-selector";
import { RecurrenceSelector } from "@/components/ui/recurrence-selector";

function AddTodo() {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [selectedRecurrence, setSelectedRecurrence] = useState("none");
  const [open, setOpen] = useState(false);
  const { addTodo } = useTodoContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedDate && !selectedTime) {
      setSelectedTime("12:00"); // Set default time when date is selected
    }
  }, [selectedDate]);

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
      addTodo(text, datetime, selectedCategory, [], selectedPriority, selectedRecurrence);
      setText("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedCategory(null);
      setSelectedPriority("medium");
      setSelectedRecurrence("none");
      setOpen(false);
      inputRef.current?.focus();
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (!selectedTime) {
      setSelectedTime("12:00"); // Set default time when date is selected
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

  return (
    <form className="flex w-full gap-3 mb-6" onSubmit={handleSubmit}>
      <div className="flex-1">
        <Input
          type="text"
          className="w-full mb-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Reminder"
          aria-label="Add a new reminder"
          ref={inputRef}
        />
      </div>
      <div className="flex gap-2 flex-1">
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <PrioritySelector
          value={selectedPriority}
          onChange={setSelectedPriority}
          className="flex-none"
        />
        <div className="flex gap-2">
          <RecurrenceSelector
            value={selectedRecurrence}
            onChange={setSelectedRecurrence}
          />
          <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex-1 justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate
                ? format(selectedDate, "MMM d, yyyy") + (selectedTime ? ` at ${selectedTime}` : "")
                : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
            {footer}
          </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button
        type="submit"
        size="icon"
        className="rounded-md"
        aria-label="Add reminder"
        disabled={!text.trim()}
      >
        <FaPlus className="text-primary-foreground" />
      </Button>
    </form>
  );
}

export default AddTodo;
