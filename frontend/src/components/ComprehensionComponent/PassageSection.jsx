import { Textarea } from "@/components/ui/textarea";

const PassageSection = ({ passage, onChange }) => {
  return (
    <div className="mb-6">
      <Textarea
        placeholder="Enter comprehension passage here..."
        className="min-h-[200px] w-3/5"
        value={passage}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PassageSection;