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
    <li className="group flex items-center gap-3 py-2 px-4 hover:bg-gray-50">
      <Checkbox.Root
        className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
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
          className="flex-1 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span
          className={`flex-1 text-sm ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil1Icon className="h-4 w-4" />
        </button>
        <button
          className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600"
          onClick={onDelete}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
