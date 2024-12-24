import React, { useState } from 'react';
import QuestionHeader from './QuestionHeader';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';
import { ItemTypes } from '../constants/ItemTypes';

const CategorySection = ({ data, onDrop }) => {
  // Track items with their current category
  const [itemCategories, setItemCategories] = useState({});

  const handleDrop = (item, targetCategoryId, questionId) => {
    setItemCategories(prev => {
      // Remove item from its previous category if it exists
      const newCategories = { ...prev };
      
      // If the item is already in the target category, do nothing
      if (newCategories[item.id] === targetCategoryId) {
        return prev;
      }

      // Update the item's category
      newCategories[item.id] = targetCategoryId;
      
      return newCategories;
    });

    onDrop(item, targetCategoryId, questionId);
  };

  if (!data?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Categorization Questions
      </h2>
      {data.map((question) => (
        <div key={question._id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <QuestionHeader number={question.displayNumber} showReset />
          <p className="mb-4 text-gray-700">{question.description}</p>
          
          {/* Uncategorized items pool */}
          <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded">
            {question.items
              ?.filter(item => !itemCategories[item.id])
              .map((item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  type={ItemTypes.CATEGORY_ITEM}
                  item={item} // Pass the complete item
                >
                  {item.name}
                </DraggableItem>
              ))}
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-4">
            {question.categories?.map((category) => (
              <DroppableArea
                key={category.id}
                type={ItemTypes.CATEGORY_ITEM}
                onDrop={(item) => handleDrop(item, category.id, question._id)}
              >
                <h3 className="font-bold mb-2">{category.name}</h3>
                {/* Show items that belong to this category */}
                {question.items
                  ?.filter(item => itemCategories[item.id] === category.id)
                  .map((item, index) => (
                    <DraggableItem
                      key={item.id}
                      id={item.id}
                      index={index}
                      type={ItemTypes.CATEGORY_ITEM}
                      item={item}
                    >
                      {item.name}
                    </DraggableItem>
                  ))}
              </DroppableArea>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategorySection;