import { Input } from "@/components/ui/input";

export const ItemInput = ({ index, item, handleItemChange }) => (
  <Input
    className="w-2/5"
    placeholder={`Item ${index + 1}`}
    value={item.name}
    onChange={(e) => handleItemChange(item.id, { name: e.target.value })}
  />
);