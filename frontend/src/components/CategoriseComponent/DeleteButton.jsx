import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const DeleteButton = ({ onDelete }) => (
  <Button variant="ghost" size="sm" onClick={onDelete}>
    <X size={16} />
  </Button>
);