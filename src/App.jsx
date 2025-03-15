import { useState } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import TodoFilter from './components/TodoFilter'
import { useTodoContext } from './context/TodoContext'
import './styles/App.css'

function App() {
  const { todos } = useTodoContext()
  const [filter, setFilter] = useState('all')

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>Todo App</h1>
        <AddTodo />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList todos={filteredTodos} />
        <div className="todo-stats">
          <p>{todos.filter(todo => !todo.completed).length} items left</p>
        </div>
      </div>
    </div>
  )
}

export default App
