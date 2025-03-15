import { useState } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import TodoFilter from './components/TodoFilter'
import { useTodoContext } from './context/TodoContext'

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 ring-1 ring-gray-100">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">Todo App</h1>
        <AddTodo />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList todos={filteredTodos} />
        <div className="mt-4 text-sm font-medium">
          <p className="text-gray-500">{todos.filter(todo => !todo.completed).length} items left</p>
        </div>
      </div>
    </div>
  )
}

export default App
