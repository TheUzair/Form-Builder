import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BsQuestionCircle, BsBookmark, BsArrowClockwise } from 'react-icons/bs';
import {
  fetchComprehensionQuestions,
  fetchClozeQuestions,
  fetchCategorizeQuestions
} from '@/services/endpoints';

const ItemTypes = {
  CATEGORY_ITEM: 'categoryItem',
  CLOZE_WORD: 'clozeWord'
};

const DraggableItem = ({ id, index, children, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-white p-2 mb-2 rounded shadow cursor-move"
    >
      {children}
    </div>
  );
};

const DroppableArea = ({ onDrop, children, type }) => {
  const [{ isOver }, drop] = useDrop({
    accept: type,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-gray-100 p-4 rounded-lg min-h-[200px] ${
        isOver ? 'bg-gray-200' : ''
      }`}
    >
      {children}
    </div>
  );
};

const Test = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [clozeData, setClozeData] = useState(null);
  const [comprehensionData, setComprehensionData] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categories, cloze, comprehension] = await Promise.all([
          fetchCategorizeQuestions(),
          fetchClozeQuestions(),
          fetchComprehensionQuestions()
        ]);
        console.log('Categories:', categories);
        console.log('Cloze:', cloze);
        console.log('Comprehension:', comprehension);
        setCategoriesData(categories);
        setClozeData(cloze);
        setComprehensionData(comprehension);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDrop = (item, categoryId) => {
    // Implement drop logic here
    console.log('Dropped item:', item, 'into category:', categoryId);
  };

  const handleSubmit = () => {
    setShowCongrats(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!categoriesData || !clozeData || !comprehensionData) {
    return <div className="flex justify-center items-center h-screen">No data available</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        
        {categoriesData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">Question {categoriesData[0].questionNumber}</div>
              <div className="flex gap-4">
                <BsQuestionCircle className="text-2xl cursor-pointer" />
                <BsBookmark className="text-2xl cursor-pointer" />
                <BsArrowClockwise className="text-2xl cursor-pointer" />
              </div>
            </div>
            <p className="mb-4">{categoriesData[0].description}</p>
            <div className="grid grid-cols-2 gap-4">
              {categoriesData[0].categories?.map((category) => (
                <DroppableArea
                  key={category.id}
                  type={ItemTypes.CATEGORY_ITEM}
                  onDrop={(item) => handleDrop(item, category.id)}
                >
                  <h3 className="font-bold mb-2">{category.name}</h3>
                  {categoriesData[0].items
                    ?.filter(item => item.category === category.name)
                    .map((item, index) => (
                      <DraggableItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        type={ItemTypes.CATEGORY_ITEM}
                      >
                        {item.name}
                      </DraggableItem>
                    ))}
                </DroppableArea>
              ))}
            </div>
          </div>
        )}

        
        {clozeData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">Question {clozeData[0].questionNumber}</div>
              <div className="flex gap-4">
                <BsQuestionCircle className="text-2xl cursor-pointer" />
                <BsBookmark className="text-2xl cursor-pointer" />
              </div>
            </div>
            <p className="mb-4">{clozeData[0].sentence}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {clozeData[0].options?.map((word, index) => (
                <DraggableItem
                  key={index}
                  id={`word-${index}`}
                  index={index}
                  type={ItemTypes.CLOZE_WORD}
                >
                  {word}
                </DraggableItem>
              ))}
            </div>
            <DroppableArea
              type={ItemTypes.CLOZE_WORD}
              onDrop={(item) => handleDrop(item, 'sentence')}
            >
              {clozeData.sentence}
            </DroppableArea>
          </div>
        )}

        
        {comprehensionData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">Question {comprehensionData[0].questionNumber}</div>
              <div className="flex gap-4">
                <BsQuestionCircle className="text-2xl cursor-pointer" />
                <BsBookmark className="text-2xl cursor-pointer" />
              </div>
            </div>
            <p className="mb-4">{comprehensionData[0].description}</p>
            <div className="bg-gray-50 p-4 rounded mb-6">
              <p className="text-lg">{comprehensionData[0].passage}</p>
            </div>
            <div className="space-y-6">
              {comprehensionData[0].subQuestions?.map((question) => (
                <div key={question.id} className="space-y-2">
                  <p className="font-semibold">{question.title}</p>
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label key={option.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.id}
                          className="form-radio"
                        />
                        <span>{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Test
        </button>

        {showCongrats && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
              <p>You have successfully submitted your test.</p>
              <button
                onClick={() => setShowCongrats(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Test;