import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';

const DraggableClozeWord = ({ word, id, questionId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CLOZE_WORD,
    item: { 
      type: ItemTypes.CLOZE_WORD,
      id,
      word,
      questionId
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`
        inline-flex
        items-center
        justify-center
        px-4
        py-2
        bg-white
        border
        rounded-md
        shadow-sm
        cursor-move
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:bg-gray-50
      `}
    >
      {word}
    </div>
  );
};

export default DraggableClozeWord;