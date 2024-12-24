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
    <Card className="mb-4 p-4">
      <div className="flex items-center justify-between mb-8 mx-8">
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-2 gap-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
          </div>
          <h3 className="text-md font-semibold flex items-center gap-2">
            Question {questionNumber}.{index + 1}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8"
          onClick={() => onDelete(question.id)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center justify-between gap-10 mb-6 mx-8">
        <Input
          placeholder="Question Text"
          className="w-2/3 px-2 py-1 text-center border border-gray-300 rounded-md"
          value={question.title}
          onChange={(e) =>
            onSubQuestionChange(question.id, { title: e.target.value })
          }
        />
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center mb-6">
            <label className="text-sm text-gray-700 mb-1">Points</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              className="w-28 text-center p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
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
          <div className="flex flex-col items-center mb-6">
            <label className="text-sm text-gray-700 mb-1">Negative Points</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              className="w-28 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-md"
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