import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const DeleteButton = ({ onDelete }) => (
  <Button
    variant="ghost"
    size="sm"
    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
    onClick={onDelete}
  >
    <X className="h-4 w-4" />
  </Button>
);