import TodoItem from './TodoItem'
import { useTodoContext } from '../context/TodoContext'

function TodoList({ todos }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext()

  if (todos.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-base">
          No reminders to display
        </p>
      </div>
    )
  }

  return (
    <ul className="todo-list rounded-lg bg-background">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={(text, datetime) => editTodo(todo.id, text, datetime)}
        />
      ))}
    </ul>
  )
}

export default TodoList
