import { GripVertical } from "lucide-react";

export const DragHandle = () => (
  <div className="cursor-grab hidden sm:block">
    <GripVertical className="h-5 w-5 sm:h-4 sm:w-4" />
  </div>
);