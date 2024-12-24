import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const PreviewCard = ({ preview }) => (
  <div className="mb-10">
    <Label htmlFor="preview" className="text-lg font-semibold">
      Preview
    </Label>
    <Card className="p-4 min-h-[100px] bg-gray-50 mt-2 border-2 w-3/5">
      <div>{preview || "Preview will appear here..."}</div>
    </Card>
  </div>
);

export default PreviewCard;
