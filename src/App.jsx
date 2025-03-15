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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo App</h1>
        <AddTodo />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList todos={filteredTodos} />
        <div className="mt-4 text-sm text-gray-600">
          <p>{todos.filter(todo => !todo.completed).length} items left</p>
        </div>
      </div>
    </div>
  )
}

export default App
