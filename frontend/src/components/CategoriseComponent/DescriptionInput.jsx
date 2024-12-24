import { Input } from "@/components/ui/input";

const DescriptionInput = ({ description, onChange }) => (
  <div className="w-3/4">
    <Input
      placeholder="Description"
      className="w-full"
      value={description}
      onChange={(e) => onChange({ description: e.target.value })}
    />
  </div>
);

export default DescriptionInput;
