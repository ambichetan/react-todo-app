import * as Checkbox from '@radix-ui/react-checkbox'
import { useState, useRef, useEffect } from 'react'
import { Pencil1Icon, TrashIcon, CheckIcon } from '@radix-ui/react-icons'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    onEdit(editText)
    setIsEditing(false)
  }

  return (
    <li className="group flex items-center gap-4 py-3 px-3 border-b border-gray-100 dark:border-gray-800">
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
          className="flex-1 rounded-lg px-3 py-2 text-base font-[-apple-system] bg-[#F2F2F7] dark:bg-[#1C1C1E] border-0 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#007AFF] dark:focus:ring-[#0A84FF]"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span
          className={`flex-1 text-base font-[-apple-system] ${
            todo.completed ? 'text-[#8E8E93] dark:text-[#48484A] line-through' : 'text-black dark:text-white'
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          className="rounded-full p-1.5 text-[#007AFF] dark:text-[#0A84FF] hover:bg-[#007AFF]/10 dark:hover:bg-[#0A84FF]/10"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil1Icon className="h-4 w-4" />
        </button>
        <button
          className="rounded-full p-1.5 text-[#FF3B30] dark:text-[#FF453A] hover:bg-[#FF3B30]/10 dark:hover:bg-[#FF453A]/10"
          onClick={onDelete}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
