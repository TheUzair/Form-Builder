import { Input } from "@/components/ui/input";

export const CategoryInput = ({ index, category, handleCategoryChange }) => (
  <Input
    className="w-3/4"
    placeholder={`Category ${index + 1}`}
    value={category.name}
    onChange={(e) => handleCategoryChange(category.id, e.target.value)}
  />
);