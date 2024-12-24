import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OptionGroup = ({ options, onOptionChange, questionId }) => {
  return (
    <div className="space-y-3 mx-2 sm:mx-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {options.map((option, index) => (
          <div 
            key={option.id} 
            className="flex items-center gap-2 sm:gap-4"
          >
            <RadioGroup
              value={option.isCorrect ? option.id.toString() : ""}
              onValueChange={(value) => {
                onOptionChange(questionId, option.id, {
                  isCorrect: option.id.toString() === value
                });
              }}
              className="flex items-center"
            >
              <RadioGroupItem 
                value={option.id.toString()} 
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
            </RadioGroup>
            <Input
              placeholder={`Option ${index + 1}`}
              className="flex-1 text-sm sm:text-base p-2 sm:p-3 h-8 sm:h-10"
              value={option.text}
              onChange={(e) =>
                onOptionChange(questionId, option.id, { 
                  text: e.target.value 
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionGroup;