import React from 'react';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { useTodoContext } from '@/context/TodoContext';

export function SubtaskList({ todoId, subtasks }) {
  const { toggleSubtask, deleteSubtask, editSubtask } = useTodoContext();

  return (
    <div className="ml-6 mt-2 space-y-2">
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className="flex items-center gap-2 text-sm"
        >
          <Checkbox
            checked={subtask.completed}
            onCheckedChange={() => toggleSubtask(todoId, subtask.id)}
            className="h-4 w-4"
          />
          <span className={cn(
            "flex-1",
            subtask.completed && "line-through text-muted-foreground"
          )}>
            {subtask.text}
          </span>
        </div>
      ))}
    </div>
  );
}