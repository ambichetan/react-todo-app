import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CategoryBadge } from "@/components/ui/category-badge";
import { useCategoryContext } from "@/context/CategoryContext";

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  const { categories, addCategory } = useCategoryContext();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#3b82f6");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName("");
      setNewCategoryColor("#3b82f6");
      setIsAddingNew(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start font-normal w-[200px]"
        >
          {selectedCategory ? (
            <CategoryBadge category={selectedCategory} />
          ) : (
            "Select category"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-2 grid gap-2">
          <Button
            variant="ghost"
            className="justify-start font-normal"
            onClick={() => onSelectCategory(null)}
          >
            No category
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => onSelectCategory(category)}
            >
              <CategoryBadge category={category} />
            </Button>
          ))}
          {!isAddingNew ? (
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => setIsAddingNew(true)}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add new
            </Button>
          ) : (
            <div className="space-y-2 p-2">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="w-[60px] p-1 h-8"
                />
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
