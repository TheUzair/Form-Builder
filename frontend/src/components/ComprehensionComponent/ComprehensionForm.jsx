import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addComprehensionQuestion } from "@/services/endpoints";
import HeaderSection from "./HeaderSection";
import PassageSection from "./PassageSection";
import PointsSection from "./PointsSection";
import SubQuestionCard from "./SubQuestionCard";

const ComprehensionForm = ({
  formId,
  questionNumber,
  points,
  negativePoints,
  description,
  passage,
  subQuestions,
  onAdd,
  onDelete,
  onFormChange,
}) => {
  const { toast } = useToast();
  const [localPassage, setLocalPassage] = useState(passage || "");
  const [localSubQuestions, setLocalSubQuestions] = useState(
    subQuestions || [
      {
        id: 1,
        title: "",
        type: "mcq",
        points: "",
        negativePoints: "",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: false },
          { id: 3, text: "", isCorrect: false },
          { id: 4, text: "", isCorrect: false },
        ],
      },
    ]
  );

  useEffect(() => {
    updateParent();
  }, [localPassage, localSubQuestions]);

  const handleSave = async () => {
    try {
      // Debug current state
      console.log('Current state before save:', {
        passage: localPassage,
        subQuestions: localSubQuestions,
        points,
        negativePoints,
        description
      });
  
      // Validate required fields
      if (!localPassage.trim()) {
        toast({
          title: "Error",
          description: "Please enter a passage",
          variant: "destructive",
        });
        return;
      }
  
      if (!localSubQuestions.length) {
        toast({
          title: "Error",
          description: "Please add at least one sub-question",
          variant: "destructive",
        });
        return;
      }
  
      // Validate sub-questions
      const invalidSubQuestions = localSubQuestions.filter(sq => {
        // Check if title is empty
        if (!sq.title.trim()) return true;
  
        // Check if at least one option is marked as correct
        if (!sq.options.some(opt => opt.isCorrect)) return true;
  
        // Check if all options have text
        if (sq.options.some(opt => !opt.text.trim())) return true;
  
        return false;
      });
  
      if (invalidSubQuestions.length > 0) {
        toast({
          title: "Error",
          description: "Please complete all sub-questions with options and correct answers",
          variant: "destructive",
        });
        return;
      }
  
      // Format the question data
      const questionData = {
        questionNumber: Number(questionNumber),
        type: 'comprehension',
        points: Number(points) || 0,
        negativePoints: Number(negativePoints) || 0,
        description: description || '',
        passage: localPassage,
        subQuestions: localSubQuestions.map(sq => ({
          id: sq.id,
          title: sq.title,
          type: sq.type,
          points: Number(sq.points) || 0,
          negativePoints: Number(sq.negativePoints) || 0,
          options: sq.options.map(opt => ({
            id: opt.id,
            text: opt.text,
            isCorrect: opt.isCorrect
          }))
        }))
      };
  
      // Debug the payload
      console.log('Sending question data:', questionData);
  
      // Send to API
      const response = await addComprehensionQuestion(questionData);
      console.log('API Response:', response);
  
      toast({
        title: "Success",
        description: "Question saved successfully",
        variant: "success",
      });
  
      // Optionally clear form or update state
      if (typeof onAdd === 'function') onAdd();
  
    } catch (error) {
      console.error('Save Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save question",
        variant: "destructive",
      });
    }
  };
  
  const updateParent = () => {
    if (typeof onFormChange === "function") {
      onFormChange({
        passage: localPassage,
        subQuestions: localSubQuestions,
        points,
        negativePoints,
        description,
      });
    }
  };

  const handlePointsChange = (value) => {
    if (typeof onFormChange === "function") {
      onFormChange({
        passage: localPassage,
        subQuestions: localSubQuestions,
        points: parseInt(value) || 0,
        negativePoints,
        description,
      });
    }
  };

  const handleNegativePointsChange = (value) => {
    if (typeof onFormChange === "function") {
      onFormChange({
        passage: localPassage,
        subQuestions: localSubQuestions,
        points,
        negativePoints: parseInt(value) || 0,
        description,
      });
    }
  };

  const handlePassageChange = (value) => {
    setLocalPassage(value);
  };

  const handleSubQuestionChange = (questionId, updates) => {
    setLocalSubQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, ...updates } : question
      )
    );
  };

  const handleOptionChange = (questionId, optionId, updates) => {
    setLocalSubQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) => {
                if (option.id === optionId) {
                  // If this is a radio selection, unselect other options
                  if ('isCorrect' in updates) {
                    return { ...option, isCorrect: updates.isCorrect };
                  }
                  // For text updates
                  return { ...option, ...updates };
                }
                // If this is a radio selection, ensure other options are unselected
                if ('isCorrect' in updates) {
                  return { ...option, isCorrect: false };
                }
                return option;
              }),
            }
          : question
      )
    );
  };

  const addSubQuestion = () => {
    const newId = Math.max(...localSubQuestions.map((q) => q.id)) + 1;
    setLocalSubQuestions([
      ...localSubQuestions,
      {
        id: newId,
        title: "",
        type: "mcq",
        points: "",
        negativePoints: "",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: false },
          { id: 3, text: "", isCorrect: false },
          { id: 4, text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const deleteSubQuestion = (questionId) => {
    if (localSubQuestions.length > 1) {
      setLocalSubQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-11">
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <HeaderSection
              questionNumber={questionNumber}
              onAdd={onAdd}
              onDelete={onDelete}
              onSave={handleSave}
            />
            <PointsSection
              points={points}
              negativePoints={negativePoints}
              onPointsChange={handlePointsChange}
              onNegativePointsChange={handleNegativePointsChange}
            />
            <PassageSection
              passage={localPassage}
              onChange={handlePassageChange}
            />
            {localSubQuestions.map((question, index) => (
              <SubQuestionCard
                key={question.id}
                question={question}
                questionNumber={questionNumber}
                index={index}
                onDelete={deleteSubQuestion}
                onSubQuestionChange={handleSubQuestionChange}
                onOptionChange={handleOptionChange}
              />
            ))}
            <Button variant="ghost" onClick={addSubQuestion} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Sub-Question
            </Button>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};

export default ComprehensionForm;