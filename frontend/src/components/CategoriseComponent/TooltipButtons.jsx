import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Plus, Trash, Save, Loader2 } from "lucide-react";

const TooltipButtons = ({ onAdd, onDelete, onSave, isSaving }) => (
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
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              console.log("Save button clicked in TooltipButtons");
              onSave();
            }}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save size={16} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Save question</span>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

export default TooltipButtons;
