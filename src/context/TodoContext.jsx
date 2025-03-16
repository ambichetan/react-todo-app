import { createContext, useContext, useReducer, useEffect } from 'react'

const TodoContext = createContext()

// Initial state
const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  summary: '',
  loadingSummary: false
}

// Action types
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const EDIT_TODO = 'EDIT_TODO'
const SET_SUMMARY = 'SET_SUMMARY'
const SET_LOADING_SUMMARY = 'SET_LOADING_SUMMARY'

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
            text: action.payload.text,
            datetime: action.payload.datetime,
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
            ? { 
                ...todo, 
                text: action.payload.text, 
                datetime: action.payload.datetime 
              }
            : todo
        )
      }
    case SET_SUMMARY:
      return {
        ...state,
        summary: action.payload
      }
    case SET_LOADING_SUMMARY:
      return {
        ...state,
        loadingSummary: action.payload
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
  const addTodo = (text, datetime) => {
    if (text.trim()) {
      dispatch({ type: ADD_TODO, payload: { text, datetime } })
    }
  }

  const toggleTodo = id => {
    dispatch({ type: TOGGLE_TODO, payload: id })
  }

  const deleteTodo = id => {
    dispatch({ type: DELETE_TODO, payload: id })
  }

  const editTodo = (id, text, datetime) => {
    if (text.trim()) {
      dispatch({ type: EDIT_TODO, payload: { id, text, datetime } })
    }
  }

  const generateSummary = async () => {
    dispatch({ type: SET_LOADING_SUMMARY, payload: true })
    try {
      // Filter out completed todos first
      const activeTodos = state.todos.filter(todo => !todo.completed)
      
      if (activeTodos.length === 0) {
        dispatch({ type: SET_SUMMARY, payload: 'No active todos to summarize.' })
        return
      }

      console.log('Generating summary for active todos:', activeTodos)

      console.log('Available env variables:', import.meta.env)
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('OpenAI API key not found in environment variables')
      }
      console.log('API Key available:', apiKey.substring(0, 10) + '...')

      // Make a direct fetch to OpenAI API
      console.log('Making request to OpenAI API...')
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that summarizes todo lists.'
            },
            {
              role: 'user',
              content: `Please provide a concise summary of these active todos: ${activeTodos.map(t => t.text).join(', ')}`
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API responded with status ${response.status}`)
      }

      const data = await response.json()
      console.log('OpenAI API response:', data)
      
      const summary = data.choices[0]?.message?.content || 'Unable to generate summary'
      console.log('Generated summary:', summary)
      
      dispatch({ type: SET_SUMMARY, payload: summary })
    } catch (error) {
      console.error('Error generating summary:', error)
      dispatch({ type: SET_SUMMARY, payload: `Failed to generate summary: ${error.message}` })
    } finally {
      dispatch({ type: SET_LOADING_SUMMARY, payload: false })
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        summary: state.summary,
        loadingSummary: state.loadingSummary,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        generateSummary
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
