import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DraggableCategory } from "./DraggableCategory";

const CategoriesSection = ({ initialCategories, onChange }) => {
  const [categories, setCategories] = useState(initialCategories);

  const addCategory = () => {
    const newCategories = [
      ...categories,
      { id: categories.length + 1, name: "" },
    ];
    setCategories(newCategories);
    onChange({ categories: newCategories });
  };

  const deleteCategory = (id) => {
    if (categories.length > 1) {
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      setCategories(updatedCategories);
      onChange({ categories: updatedCategories });
    }
  };

  const handleCategoryChange = (id, name) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === id ? { ...cat, name } : cat
    );
    setCategories(updatedCategories);
    onChange({ categories: updatedCategories });
  };

  const moveCategory = (dragIndex, hoverIndex) => {
    const dragCategory = categories[dragIndex];
    const newCategories = [...categories];
    newCategories.splice(dragIndex, 1);
    newCategories.splice(hoverIndex, 0, dragCategory);
    setCategories(newCategories);
    onChange({ categories: newCategories });
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="mb-6">
      <h3 className="text-md font-semibold mb-4">Categories</h3>
      {categories.map((category, index) => (
        <DraggableCategory
          key={category.id}
          category={category}
          index={index}
          moveCategory={moveCategory}
          handleCategoryChange={handleCategoryChange}
          deleteCategory={deleteCategory}
        />
      ))}
      <Button variant="ghost" onClick={addCategory} className="mt-2">
        <Plus size={16} className="mr-2" />
        Add Category
      </Button>
    </div>
  </DndProvider>
);
};

export default CategoriesSection;