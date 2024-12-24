import { Button } from "@/components/ui/button";
import { Underline, RotateCcw } from "lucide-react";

const Toolbar = ({
  toolbarPosition,
  showToolbar,
  selectedOptionIndex,
  handleUnderline,
  handleRestore,
}) => {
  if (!showToolbar) return null;

  return (
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
  );
};

export default Toolbar;
