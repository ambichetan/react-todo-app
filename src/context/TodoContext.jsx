import { createContext, useContext, useReducer, useEffect } from 'react'

const TodoContext = createContext()

// Initial state
const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || []
}

// Action types
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const EDIT_TODO = 'EDIT_TODO'

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      }
    default:
      return state
  }
}

// Provider component
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state.todos])

  // Action creators
  const addTodo = text => {
    if (text.trim()) {
      dispatch({ type: ADD_TODO, payload: text })
    }
  }

  const toggleTodo = id => {
    dispatch({ type: TOGGLE_TODO, payload: id })
  }

  const deleteTodo = id => {
    dispatch({ type: DELETE_TODO, payload: id })
  }

  const editTodo = (id, text) => {
    if (text.trim()) {
      dispatch({ type: EDIT_TODO, payload: { id, text } })
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

// Custom hook to use the todo context
export function useTodoContext() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider')
  }
  return context
}
