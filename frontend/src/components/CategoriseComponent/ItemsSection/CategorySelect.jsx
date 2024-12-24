// components/ItemsSection/CategorySelect.jsx
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const CategorySelect = ({ item, categories, handleItemChange }) => (
  <Select
    value={item.category}
    onValueChange={(value) => handleItemChange(item.id, { category: value })}
  >
    <SelectTrigger className="w-1/2">
      <SelectValue placeholder="Choose Category" />
    </SelectTrigger>
    <SelectContent
      position="popper"
      className={cn(
        "relative z-[9999] w-[var(--radix-select-trigger-width)]",
        "before:content-[''] before:fixed before:inset-0",
        "before:bg-black/20 before:backdrop-blur-sm before:-z-10"
      )}
      sideOffset={5}
    >
      <div className="bg-white rounded-md shadow-lg border">
        {categories.length > 0 ? (
          categories.map((category) => (
            category.name && (
              <SelectItem
                key={category.id}
                value={category.name || `category-${category.id}`}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {category.name || `Category ${category.id}`}
              </SelectItem>
            )
          ))
        ) : (
          <div className="p-2 text-gray-500">No categories available</div>
        )}
      </div>
    </SelectContent>
  </Select>
);