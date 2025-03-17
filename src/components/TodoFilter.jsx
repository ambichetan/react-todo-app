import { Button } from "@/components/ui/button";
import { useTodoContext } from "@/context/TodoContext";
import { CategoryBadge } from "@/components/ui/category-badge";
import CategorySelector from "@/components/CategorySelector";
import { PrioritySelector } from "@/components/ui/priority-selector";

function TodoFilter() {
  const { filter, setFilter } = useTodoContext();

  const handleStatusChange = (status) => {
    setFilter({ ...filter, status });
  };

  const handleCategorySelect = (category) => {
    setFilter({ ...filter, category });
  };

  const handlePrioritySelect = (priority) => {
    setFilter({ ...filter, priority: priority === filter.priority ? null : priority });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex gap-2">
        <Button
          variant={filter.status === "all" ? "default" : "ghost"}
          className="text-sm font-medium"
          onClick={() => handleStatusChange("all")}
        >
          All
        </Button>
        <Button
          variant={filter.status === "active" ? "default" : "ghost"}
          className="text-sm font-medium"
          onClick={() => handleStatusChange("active")}
        >
          Active
        </Button>
        <Button
          variant={filter.status === "completed" ? "default" : "ghost"}
          className="text-sm font-medium"
          onClick={() => handleStatusChange("completed")}
        >
          Completed
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <CategorySelector
            selectedCategory={filter.category}
            onSelectCategory={handleCategorySelect}
          />
          {filter.category && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => handleCategorySelect(null)}
            >
              ×
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Priority:</span>
          <PrioritySelector
            value={filter.priority || "medium"}
            onChange={handlePrioritySelect}
          />
          {filter.priority && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => handlePrioritySelect(null)}
            >
              ×
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoFilter;
