import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragHandle } from "./DragHandle";
import { ItemInput } from "./ItemInput";
import { DeleteButton } from "./DeleteButton";
import { CategorySelect } from "./CategorySelect";

export const DraggableItem = ({
  item,
  index,
  moveItem,
  handleItemChange,
  deleteItem,
  categories,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveItem(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 gap-4 mb-3 ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-4">
        <DragHandle />
        <div className="flex-1 flex items-center gap-2">
          <ItemInput
            index={index}
            item={item}
            handleItemChange={handleItemChange}
          />
          <DeleteButton onDelete={() => deleteItem(item.id)} />
        </div>
      </div>
      <div className="relative">
        <CategorySelect
          item={item}
          categories={categories}
          handleItemChange={handleItemChange}
        />
      </div>
    </div>
  );
};
