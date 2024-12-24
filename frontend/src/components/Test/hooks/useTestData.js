import { useState, useEffect } from 'react';
import {
  fetchComprehensionQuestions,
  fetchClozeQuestions,
  fetchCategorizeQuestions
} from '@/services/endpoints';

const useTestData = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [clozeData, setClozeData] = useState(null);
  const [comprehensionData, setComprehensionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState({
    categories: {},
    cloze: {},
    comprehension: {}
  });

  const renumberQuestions = (questions) => {
    return questions.map((q, index) => ({
      ...q,
      displayNumber: index + 1
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categories, cloze, comprehension] = await Promise.all([
          fetchCategorizeQuestions(),
          fetchClozeQuestions(),
          fetchComprehensionQuestions()
        ]);

        setCategoriesData(renumberQuestions(
          categories.sort((a, b) => a.questionNumber - b.questionNumber)
        ));
        setClozeData(renumberQuestions(
          cloze.sort((a, b) => a.questionNumber - b.questionNumber)
        ));
        setComprehensionData(renumberQuestions(
          comprehension.sort((a, b) => a.questionNumber - b.questionNumber)
        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

	const handleDrop = (item, categoryId, questionId) => {
		// Validate the drop
		if (!item || !categoryId || !questionId) return;
	
		setCompletedQuestions(prev => ({
			...prev,
			categories: {
				...prev.categories,
				[questionId]: {
					...prev.categories[questionId],
					[item.id]: categoryId
				}
			}
		}));
	};

  const handleClozeAnswer = (dropResult) => {
    const { word, blankIndex, questionId } = dropResult;
    console.log('Dropped word:', word);
    console.log('At blank index:', blankIndex);
    console.log('Question ID:', questionId);
    setCompletedQuestions(prev => ({
      ...prev,
      cloze: {
        ...prev.cloze,
        [questionId]: true
      }
    }));
  };

  const handleComprehensionAnswer = (questionId) => {
    setCompletedQuestions(prev => ({
      ...prev,
      comprehension: {
        ...prev.comprehension,
        [questionId]: true
      }
    }));
  };

  return {
    categoriesData,
    clozeData,
    comprehensionData,
    isLoading,
    completedQuestions,
    handleDrop,
    handleClozeAnswer,
    handleComprehensionAnswer
  };
};

export default useTestData;