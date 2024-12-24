import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DescriptionInput = ({ description, setDescription }) => (
  <div className="mb-4 w-3/5">
    <Label htmlFor="description" className="text-lg font-semibold">
      Description
    </Label>
    <Input
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full mt-4"
    />
  </div>
);

export default DescriptionInput;
