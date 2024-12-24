import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop, children, type }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: type,
    drop: (item, monitor) => {
      // Only process the drop if it's actually changing position
      if (monitor.didDrop()) {
        return;
      }
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`
        bg-gray-100 p-4 rounded-lg min-h-[200px] transition-colors duration-200
        ${isOver && canDrop ? 'bg-green-50 border-2 border-green-300' : ''}
        ${!isOver && canDrop ? 'bg-blue-50 border-2 border-blue-300' : ''}
      `}
    >
      {children}
    </div>
  );
};

export default DroppableArea;