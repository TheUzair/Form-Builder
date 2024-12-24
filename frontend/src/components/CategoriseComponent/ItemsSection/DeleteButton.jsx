import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const DeleteButton = ({ onDelete }) => (
  <Button
    variant="ghost"
    size="sm"
    className="h-10 w-10 sm:h-8 sm:w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
    onClick={onDelete}
  >
    <X className="h-5 w-5 sm:h-4 sm:w-4" />
  </Button>
);