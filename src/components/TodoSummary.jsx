import { useTodoContext } from "../context/TodoContext";

function TodoSummary() {
  const { generateSummary, summary, loadingSummary, todos } = useTodoContext();

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  const handleGenerateClick = () => {
    console.log("Generate button clicked");
    console.log("Active todos count:", activeTodoCount);
    console.log("Loading state:", loadingSummary);
    generateSummary();
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Summary
        </h2>
        <button
          onClick={handleGenerateClick}
          disabled={loadingSummary || activeTodoCount === 0}
          className="px-4 py-2 text-sm font-medium text-white bg-[#007AFF] dark:bg-[#0A84FF] rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loadingSummary
            ? "Generating..."
            : activeTodoCount === 0
            ? "No Active Todos"
            : "Generate Summary"}
        </button>
      </div>
      {summary && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default TodoSummary;
