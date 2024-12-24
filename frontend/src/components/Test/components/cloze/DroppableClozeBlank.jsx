import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';

const DroppableClozeBlank = ({ onDrop, filledWord, questionId, blankIndex }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CLOZE_WORD,
    drop: (item) => {
      onDrop({
        ...item,
        questionId,
        blankIndex
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <span
      ref={drop}
      className={`
        inline-block
        min-w-[120px]
        px-3
        py-1
        mx-1
        text-center
        border-b-2
        border-gray-400
        ${isOver ? 'bg-blue-50' : ''}
        ${filledWord ? 'bg-gray-50' : ''}
      `}
    >
      {filledWord || '_____'}
    </span>
  );
};

export default DroppableClozeBlank;