import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dropdown = () => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select Question Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="cloze">Cloze</SelectItem>
      <SelectItem value="mcq">MCQ</SelectItem>
      <SelectItem value="categorize">Categorize</SelectItem>
      <SelectItem value="comprehension">Comprehension</SelectItem>
    </SelectContent>
  </Select>
);

export default Dropdown;
