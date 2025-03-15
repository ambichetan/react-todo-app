import TodoItem from './TodoItem'
import { useTodoContext } from '../context/TodoContext'

function TodoList({ todos }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext()

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos to display</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={(text) => editTodo(todo.id, text)}
        />
      ))}
    </ul>
  )
}

export default TodoList
