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
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="Add a new task"
      />
      <button 
        type="submit" 
        className="add-button"
        aria-label="Add task"
        disabled={!text.trim()}
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default AddTodo
