import { useState, useRef, useEffect } from 'react'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit(editText)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
          />
          <span className="checkmark">
            {todo.completed && <FaCheck />}
          </span>
        </label>
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span 
            className="todo-text"
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button 
              className="icon-button edit-button" 
              onClick={handleEdit}
              aria-label="Edit todo"
            >
              <FaEdit />
            </button>
            <button 
              className="icon-button delete-button" 
              onClick={onDelete}
              aria-label="Delete todo"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
