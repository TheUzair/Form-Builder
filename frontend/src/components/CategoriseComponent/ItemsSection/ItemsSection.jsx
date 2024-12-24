import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DraggableItem } from "./DraggableItem";

const ItemsSection = ({ initialItems, categories, onChange }) => {
  const [items, setItems] = useState(initialItems);

  const addItem = () => {
    const newItems = [
      ...items,
      { id: items.length + 1, name: "", category: "" },
    ];
    setItems(newItems);
    onChange({ items: newItems });
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onChange({ items: updatedItems });
  };

  const handleItemChange = (id, updates) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    setItems(updatedItems);
    onChange({ items: updatedItems });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setItems(newItems);
    onChange({ items: newItems });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h3 className="text-md font-semibold mb-4">Items</h3>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            handleItemChange={handleItemChange}
            deleteItem={deleteItem}
            categories={categories}
          />
        ))}
        <Button variant="ghost" onClick={addItem} className="mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </DndProvider>
  );
};

export default ItemsSection;