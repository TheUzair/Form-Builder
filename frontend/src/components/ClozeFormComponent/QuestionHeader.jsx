import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash, Save } from "lucide-react";

const QuestionHeader = ({ questionNumber, onAdd, onDelete, onSave }) => (
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

    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={onAdd}>
              <Plus size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Add a question</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Delete this question</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={onSave}>
              <Save size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Save question</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  </div>
);

export default QuestionHeader;
