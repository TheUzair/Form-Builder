import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import CategorySection from './components/CategorySection';
import ClozeSection from './components/ClozeSection';
import ComprehensionSection from './components/ComprehensionSection';
import ErrorModal from './modals/ErrorModal';
import CongratsModal from './modals/CongratsModal';
import useTestData from './hooks/useTestData';
import "../../App.css"

const Test = () => {
  const navigate = useNavigate();
  const {
    categoriesData,
    clozeData,
    comprehensionData,
    isLoading,
    completedQuestions,
    handleDrop,
    handleClozeAnswer,
    handleComprehensionAnswer
  } = useTestData();

  const [showCongrats, setShowCongrats] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({
    categories: false,
    cloze: false,
    comprehension: false
  });

  const handleClose = () => {
    setShowCongrats(false);
    navigate('/');
  };

  const validateSubmission = () => {
    const newErrors = {
      categories: false,
      cloze: false,
      comprehension: false
    };

    if (categoriesData?.length > 0) {
      const completedCategories = Object.keys(completedQuestions.categories).length;
      if (completedCategories < categoriesData.length) {
        newErrors.categories = true;
      }
    }

    if (clozeData?.length > 0) {
      const completedCloze = Object.keys(completedQuestions.cloze).length;
      if (completedCloze < clozeData.length) {
        newErrors.cloze = true;
      }
    }

    if (comprehensionData?.length > 0) {
      const completedComprehension = Object.keys(completedQuestions.comprehension).length;
      if (completedComprehension < comprehensionData.length) {
        newErrors.comprehension = true;
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateSubmission()) {
      setShowCongrats(true);
    } else {
      setShowError(true);
    }
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
        <CategorySection data={categoriesData} onDrop={handleDrop} />
        <ClozeSection data={clozeData} onDrop={handleClozeAnswer} />
        <ComprehensionSection 
          data={comprehensionData} 
          onAnswer={handleComprehensionAnswer} 
        />

        {(!categoriesData?.length && !clozeData?.length && !comprehensionData?.length) && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No questions available for this test.</p>
          </div>
        )}

        {showError && <ErrorModal errors={errors} onClose={() => setShowError(false)} />}
        
        {(categoriesData?.length || clozeData?.length || comprehensionData?.length) && (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Test
          </button>
        )}

        {showCongrats && (
          <CongratsModal onClose={handleClose} onStay={() => setShowCongrats(false)} />
        )}
      </div>
    </DndProvider>
  );
};

export default Test;