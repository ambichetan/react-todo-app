import { useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import TodoFilter from "./components/TodoFilter";
import ThemeToggle from "./components/ThemeToggle";
import TodoSummary from "./components/TodoSummary";
import { useTodoContext } from "./context/TodoContext";

function App() {
  const { todos } = useTodoContext();
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black py-8 transition-colors">
      <ThemeToggle />
      <div className="max-w-md mx-auto bg-white dark:bg-[#1C1C1E] rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-[#007AFF] dark:text-[#0A84FF] mb-6">
          Reminders
        </h1>
        <AddTodo />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList todos={filteredTodos} />
        <TodoSummary />
        <div className="mt-4 text-sm font-medium">
          <p className="text-gray-500 dark:text-gray-400">
            {todos.filter((todo) => !todo.completed).length} items left
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
