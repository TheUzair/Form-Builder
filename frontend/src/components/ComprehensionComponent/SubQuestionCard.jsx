import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import OptionGroup from "./OptionGroup";

const SubQuestionCard = ({
  question,
  questionNumber,
  index,
  onDelete,
  onSubQuestionChange,
  onOptionChange,
}) => {
  return (
    <Card className="mb-4 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-4 sm:mb-8 mx-2 sm:mx-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="grid grid-cols-2 gap-0.5 sm:gap-1">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full"></div>
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full"></div>
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full"></div>
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full"></div>
          </div>
          <h3 className="text-sm sm:text-md font-semibold flex items-center gap-1 sm:gap-2">
            Question {questionNumber}.{index + 1}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 sm:h-8 sm:w-8"
          onClick={() => onDelete(question.id)}
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-10 mb-4 sm:mb-6 mx-2 sm:mx-8">
        <Input
          placeholder="Question Text"
          className="w-full sm:w-2/3 px-2 py-1 text-sm sm:text-base text-center border border-gray-300 rounded-md"
          value={question.title}
          onChange={(e) =>
            onSubQuestionChange(question.id, { title: e.target.value })
          }
        />
        
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-10">
          <div className="flex flex-col items-center">
            <label className="text-xs sm:text-sm text-gray-700 mb-1">Points</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              className="w-full sm:w-28 text-center p-1 sm:p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={isNaN(question.points) ? "" : question.points}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  onSubQuestionChange(question.id, {
                    points: value === "" ? 0 : parseInt(value),
                  });
                }
              }}
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-xs sm:text-sm text-gray-700 mb-1">Negative Points</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              className="w-full sm:w-28 text-center p-1 sm:p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-md"
              value={isNaN(question.negativePoints) ? "" : question.negativePoints}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  onSubQuestionChange(question.id, {
                    negativePoints: value === "" ? 0 : parseInt(value),
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      <OptionGroup
        options={question.options}
        questionId={question.id}
        onOptionChange={onOptionChange}
      />
    </Card>
  );
};

export default SubQuestionCard;