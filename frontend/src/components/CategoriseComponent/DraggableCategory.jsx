import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragHandle } from "./DragHandle";
import { CategoryInput } from "./CategoryInput";
import { DeleteButton } from "./DeleteButton";

export const DraggableCategory = ({ 
  category, 
  index, 
  moveCategory, 
  handleCategoryChange, 
  deleteCategory 
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CATEGORY",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CATEGORY",
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCategory(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 mb-3 ${isDragging ? "opacity-50" : ""}`}
    >
      <DragHandle />
      <CategoryInput 
        index={index}
        category={category}
        handleCategoryChange={handleCategoryChange}
      />
      <DeleteButton onDelete={() => deleteCategory(category.id)} />
    </div>
  );
};