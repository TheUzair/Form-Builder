import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, index, children, type, item }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { ...item, id, index }, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
      className={`
        bg-white p-2 mb-2 rounded shadow 
        ${isDragging ? 'border-2 border-blue-400' : ''}
        hover:shadow-md transition-shadow duration-200
      `}
    >
      {children}
    </div>
  );
};

export default DraggableItem;