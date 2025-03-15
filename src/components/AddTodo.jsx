import { useState } from 'react'
import { useTodoContext } from '../context/TodoContext'
import { FaPlus } from 'react-icons/fa'

function AddTodo() {
  const [text, setText] = useState('')
  const { addTodo } = useTodoContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text)
      setText('')
    }
  }

  return (
    <form className="flex gap-3 mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 rounded-lg px-4 py-3 text-base font-[-apple-system] bg-[#F2F2F7] dark:bg-[#1C1C1E] text-black dark:text-white placeholder-[#8E8E93] dark:placeholder-[#48484A] focus:outline-none focus:ring-2 focus:ring-[#007AFF] dark:focus:ring-[#0A84FF] transition-all"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Reminder"
        aria-label="Add a new reminder"
      />
      <button 
        type="submit" 
        className="bg-[#007AFF] hover:bg-[#007AFF]/90 dark:bg-[#0A84FF] dark:hover:bg-[#0A84FF]/90 text-white rounded-full w-10 h-10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="Add reminder"
        disabled={!text.trim()}
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default AddTodo
