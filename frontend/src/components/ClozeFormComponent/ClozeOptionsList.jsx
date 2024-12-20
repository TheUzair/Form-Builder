import { useDrag, useDrop } from "react-dnd";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const OptionsList = ({ options, setOptions, sentence, setSentence }) => {
  const moveOption = (dragIndex, hoverIndex) => {
    const updatedOptions = [...options];
    const [reorderedItem] = updatedOptions.splice(dragIndex, 1);
    updatedOptions.splice(hoverIndex, 0, reorderedItem);
    setOptions(updatedOptions);
  };

  const removeOption = (indexToRemove) => {
    const optionToRemove = options[indexToRemove];
    const updatedOptions = options.filter((_, index) => index !== indexToRemove);
    setOptions(updatedOptions);
  
    // Remove underline from the sentence
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sentence;
    const spanToRemove = tempDiv.querySelector(`span[data-word]`);
    if (spanToRemove) {
      const word = spanToRemove.getAttribute('data-word');
      if (word === optionToRemove.word) {
        spanToRemove.outerHTML = spanToRemove.innerHTML;
      }
    }
    setSentence(tempDiv.innerHTML); // Add this line
  };
  
  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <Option
          key={index}
          index={index}
          option={option}
          moveOption={moveOption}
          removeOption={removeOption}
        />
      ))}
    </div>
  );
};

const Option = ({ index, option, moveOption, removeOption }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "option",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "option",
    hover: (draggedItem, monitor) => {
      if (draggedItem.index !== index) {
        moveOption(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Card
      ref={(node) => dragRef(dropRef(node))}
      className={`p-3 border ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-4">
        {/* Four circles making a square */}
        <div className="flex flex-wrap w-6 h-6 cursor-move">
          <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
        </div>

        {/* Checkbox */}
        <Checkbox
          id={`option-${index}`}
          checked={true}
          onCheckedChange={(checked) => {
            if (!checked) {
              removeOption(index);
            }
          }}
        />

        {/* Option Label */}
        <Label htmlFor={`option-${index}`} className="text-sm font-medium">
          {option.word}
        </Label>
      </div>
    </Card>
  );
};

export default OptionsList;