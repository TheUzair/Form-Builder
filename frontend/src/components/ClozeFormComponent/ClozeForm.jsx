import { useState, useEffect, useRef } from "react";
import OptionsList from "./ClozeOptionsList";
import Sidebar from "../Sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Underline, RotateCcw, MoreVertical, Plus, Trash } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addClozeQuestion } from "@/services/endpoints";

const ClozeForm = ({ formId, questionNumber, onAdd, onDelete }) => {
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

    // Sort options by index in descending order to avoid position shifts
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

  const handleInputChange = (e) => {
    setSentence(e.target.value);
    setShowToolbar(e.target.value.length > 0);
  };

  // Handle underline functionality
  const handleUnderline = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText && !options.some((opt) => opt.word === selectedText)) {
      const startIndex = sentence.indexOf(selectedText);
      if (startIndex !== -1) {
        // Add selected word and its start index to options
        setOptions([...options, { word: selectedText, index: startIndex }]);

        // Wrap the selected text with an underline span
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.textDecoration = 'underline';
        span.dataset.word = selectedText;
        range.surroundContents(span);

        // Update the sentence state with the new HTML content
        setSentence(inputRef.current.innerHTML);
      }
    }
    setShowToolbar(false);
  };

  const handleSelection = () => {
    const selection = window.getSelection().toString().trim();
    if (selection === ".....") {
      // Find which blank (dots) is selected
      const selectedIndex = options.findIndex(({ index }) => {
        const dotIndex = sentence.indexOf(".....", index);
        return dotIndex === index;
      });
      setSelectedOptionIndex(selectedIndex);
    } else {
      setSelectedOptionIndex(null);
    }
  };

  // Handle focus to position the toolbar and show it
  const handleFocus = () => {
    const rect = inputRef.current.getBoundingClientRect();
    setToolbarPosition({
      x: rect.left + 60,
      y: rect.top - 45, // Positioned above the input
    });
    setShowToolbar(sentence.length > 0);
  };

  // Hide toolbar on blur
  const handleBlur = () => {
    setTimeout(() => setShowToolbar(false), 200); // Small delay to ensure click on toolbar icons works
  };

  const handleSave = async () => {
    try {
      const clozeData = {
        questionNumber,
        type: 'cloze',
        points: points || 0,
        negativePoints : negativePoints || 0,
        description : description || "Fill in the blanks:",
        sentence: preview,
        underlinedWords: options.map(opt => opt.word),
        options: options.map(opt => opt.word)
      };

      await addClozeQuestion(clozeData);
      alert("Question saved successfully!");
    } catch (error) {
      console.error('Error saving cloze:', error);
      alert("Error saving question");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>

      <Card className="p-6 shadow-lg rounded-lg bg-white">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            
            <div className="flex flex-wrap w-6 h-6">
              <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
            </div>

            
            <h2 className="text-lg font-semibold">Question {questionNumber}</h2>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onAdd}>
              <Plus size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash size={16} />
            </Button>
          </div>

          
          <Button variant="ghost" size="sm" className="h-8 w-8">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        
        <div className="mb-4 flex justify-end gap-4">
          <Input
            type="number"
            placeholder="Points"
            className="w-24"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Negative Points"
            className="w-24"
            value={negativePoints}
            onChange={(e) => setNegativePoints(Number(e.target.value))}
          />

          <Button onClick={handleSave}>Save</Button>
        </div>

        <div className="mb-4">
          <Label htmlFor="description" className="text-lg font-semibold">
            Description
          </Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-3/5"
          />
        </div>

        
        <div className="mb-10">
          <Label htmlFor="preview" className="text-lg font-semibold">
            Preview
          </Label>
          <Card className="p-4 min-h-[100px] bg-gray-50 mt-2 border-2 w-3/5">
            <div>
              {preview || "Preview will appear here..."}
            </div>
          </Card>
        </div>

        
        <div className="mb-6 relative">
          <Label
            htmlFor="sentence"
            className={`text-lg font-semibold transition-transform duration-200 ${showToolbar ? "transform -translate-y-6" : ""
              }`}
          >
            Sentence
          </Label>
          <div
            ref={inputRef}
            contentEditable
            onInput={(e) => handleInputChange({ target: { value: e.currentTarget.innerText } })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseUp={handleSelection}
            onKeyUp={handleSelection}
            className="w-3/5 mt-2 h-12 border rounded-md p-2 outline-none"
            style={{ minHeight: '3rem' }}
          />
          <p className="text-sm mt-2 text-gray-500">
            Underline a word to convert it into a blank.
          </p>

          
          {showToolbar && (
            <div
              className="fixed z-50 bg-white rounded-lg shadow-xl border p-2 flex gap-1"
              style={{
                left: `${toolbarPosition.x}px`,
                top: `${toolbarPosition.y}px`,
              }}
            >
              {selectedOptionIndex === null ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleUnderline}
                  className="h-8 w-8 p-1 hover:bg-gray-100"
                  title="Convert to blank"
                >
                  <Underline className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRestore(selectedOptionIndex)}
                  className="h-8 w-8 p-1 hover:bg-gray-100"
                  title="Restore original word"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        
        <OptionsList
          options={options}
          setOptions={setOptions}
          sentence={sentence}
          setSentence={setSentence}
        />
      </Card>

    </DndProvider>
  );
};

export default ClozeForm;
