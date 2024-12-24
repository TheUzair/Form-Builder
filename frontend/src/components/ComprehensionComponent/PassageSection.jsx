import { Textarea } from "@/components/ui/textarea";

const PassageSection = ({ passage, onChange }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <Textarea
        placeholder="Enter comprehension passage here..."
        className="min-h-[150px] sm:min-h-[200px] w-full sm:w-4/5 md:w-3/5 text-sm sm:text-base p-2 sm:p-3"
        value={passage}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PassageSection;