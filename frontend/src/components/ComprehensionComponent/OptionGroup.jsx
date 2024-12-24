import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OptionGroup = ({ options, onOptionChange, questionId }) => {
  return (
    <div className="space-y-3 mx-8">
      <div className="grid grid-cols-2 gap-6">
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center gap-4">
            <RadioGroup
              value={option.isCorrect ? option.id.toString() : ""}
              onValueChange={(value) => {
                // Update single option's isCorrect status
                onOptionChange(questionId, option.id, {
                  isCorrect: option.id.toString() === value
                });
              }}
            >
              <RadioGroupItem value={option.id.toString()} />
            </RadioGroup>
            <Input
              placeholder={`Option ${index + 1}`}
              className="flex-1"
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