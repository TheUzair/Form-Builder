import { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Toolbar from "./Toolbar";
import OptionsList from "./ClozeOptionsList";
import PointsInput from "./PointsInput";
import SentenceInput from "./SentenceInput";
import DescriptionInput from "./DescriptionInput";
import PreviewCard from "./PreviewCard";
import QuestionHeader from "./QuestionHeader";
import { addClozeQuestion } from "@/services/endpoints";
import { Card } from "@/components/ui/card";

const ClozeForm = ({ formId, questionNumber, onAdd, onDelete, onFormChange }) => {
  const [sentence, setSentence] = useState("");
  const [options, setOptions] = useState([]); // Track blanks with their positions
  const [preview, setPreview] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [points, setPoints] = useState(0);
  const [negativePoints, setNegativePoints] = useState(0);
  const [description, setDescription] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    // Create a temporary div to extract plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sentence;
    let previewText = tempDiv.textContent || tempDiv.innerText;

    const sortedOptions = [...options].sort((a, b) => b.index - a.index);

    // Replace words with dots
    sortedOptions.forEach(({ word, index }) => {
      previewText =
        previewText.substring(0, index) +
        "....." +
        previewText.substring(index + word.length);
    });

    setPreview(previewText);
  }, [sentence, options]);

  useEffect(() => {
    onFormChange({
      sentence,
      options,
      points,
      negativePoints,
      description
    });
  }, [sentence, options, points, negativePoints, description]);

  const handleInputChange = (e) => {
    setSentence(e.target.value);
    setShowToolbar(e.target.value.length > 0);
  };

  const handleUnderline = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText && !options.some((opt) => opt.word === selectedText)) {
      const startIndex = sentence.indexOf(selectedText);
      if (startIndex !== -1) {
        setOptions([...options, { word: selectedText, index: startIndex }]);

        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.textDecoration = 'underline';
        span.dataset.word = selectedText;
        range.surroundContents(span);

        setSentence(inputRef.current.innerHTML);
      }
    }
    setShowToolbar(false);
  };

  const handleSelection = () => {
    const selection = window.getSelection().toString().trim();
    if (selection === ".....") {
      const selectedIndex = options.findIndex(({ index }) => {
        const dotIndex = sentence.indexOf(".....", index);
        return dotIndex === index;
      });
      setSelectedOptionIndex(selectedIndex);
    } else {
      setSelectedOptionIndex(null);
    }
  };

  const handleFocus = () => {
    const rect = inputRef.current.getBoundingClientRect();
    setToolbarPosition({
      x: rect.left + 60,
      y: rect.top - 45, 
    });
    setShowToolbar(sentence.length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => setShowToolbar(false), 200); 
  };

  const handleSave = async () => {
    try {
      if (!sentence.trim()) {
        alert("Please enter a sentence");
        return;
      }
  
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sentence;
      const rawSentence = tempDiv.textContent || tempDiv.innerText;
  
      const payload = {
        questionNumber: Number(questionNumber),
        type: 'cloze',
        points: Number(points) || 0,
        negativePoints: Number(negativePoints) || 0,
        description: String(description || "Fill in the blanks:"),
        sentence: rawSentence.trim(),
        blanks: options.map(opt => ({
          word: String(opt.word),
          index: rawSentence.indexOf(opt.word)
        })),
        underlinedWords: options.map(opt => String(opt.word)),
        options: options.map(opt => String(opt.word))
      };
  
      console.log('Sending payload:', payload);
  
      const response = await addClozeQuestion(payload);
      
      if (response) {
        alert("Question saved successfully!");
        if (typeof onAdd === 'function') onAdd();
      }
    } catch (error) {
      console.error('Save Error:', {
        error,
        message: error.message,
        details: error.response?.data
      });
      alert(`Error saving question: ${error.message || 'Unknown error occurred'}`);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-1 md:col-span-11">
        <Card className="p-3 md:p-6 shadow-lg rounded-lg bg-white">
          <QuestionHeader
            questionNumber={questionNumber}
            onAdd={onAdd}
            onDelete={onDelete}
            onSave={handleSave}
          />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
            <PointsInput
              points={points}
              negativePoints={negativePoints}
              setPoints={setPoints}
              setNegativePoints={setNegativePoints}
            />
          </div>

          <PreviewCard preview={preview} />

          <SentenceInput
            sentence={sentence}
            inputRef={inputRef}
            handleInputChange={handleInputChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleSelection={handleSelection}
          />
          <OptionsList options={options} setOptions={setOptions} />

          <Toolbar
            toolbarPosition={toolbarPosition}
            showToolbar={showToolbar}
            selectedOptionIndex={selectedOptionIndex}
            handleUnderline={handleUnderline}
          />
        </Card>
      </div>
    </div>
  </DndProvider>
);
};

export default ClozeForm;
