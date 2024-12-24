import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PreviewCard = ({ preview }) => (
  <div className="mb-10">
    <Label htmlFor="preview" className="text-lg font-semibold">
      Preview
    </Label>
    <Card 
      className={cn(
        "p-4 mt-2 border-2",
        "w-full md:w-3/5",
        "min-h-[100px] max-h-[200px]",
        "bg-gray-50",
        "overflow-y-auto"
      )}
    >
      <div className={cn(
        "whitespace-pre-wrap",
        "break-words",
        "overflow-wrap-anywhere"
      )}>
        {preview || "Preview will appear here..."}
      </div>
    </Card>
  </div>
);

export default PreviewCard;