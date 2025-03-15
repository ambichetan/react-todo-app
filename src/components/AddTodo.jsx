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
    <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 transition-all duration-200 bg-white dark:bg-gray-700"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="Add a new task"
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg px-4 py-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="Add task"
        disabled={!text.trim()}
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default AddTodo
