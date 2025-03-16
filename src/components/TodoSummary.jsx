import { useTodoContext } from "../context/TodoContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function TodoSummary() {
  const { generateSummary, summary, loadingSummary, todos, dispatch } = useTodoContext();

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  const handleGenerateClick = () => {
    generateSummary(todos, dispatch);
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          AI Summary
        </h2>
        <Button
          onClick={handleGenerateClick}
          disabled={loadingSummary || activeTodoCount === 0}
        >
          {loadingSummary
            ? "Generating..."
            : activeTodoCount === 0
            ? "No Active Todos"
            : "Generate Summary"}
        </Button>
      </div>
      {summary && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default TodoSummary;
