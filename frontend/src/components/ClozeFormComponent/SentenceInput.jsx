import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SentenceInput = ({
  sentence,
  handleInputChange,
  handleFocus,
  handleBlur,
  handleSelection,
  inputRef,
}) => (
  <div className="mb-6 relative">
    <Label
      htmlFor="sentence"
      className="text-lg font-semibold transition-transform duration-200"
    >
      Sentence
    </Label>
    <div
      ref={inputRef}
      contentEditable
      onInput={(e) => handleInputChange({ target: { value: e.currentTarget.innerText } })}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseUp={handleSelection}
      onKeyUp={handleSelection}
      className={cn(
        "w-full md:w-3/5 mt-2 border rounded-md p-2 outline-none",
        "min-h-[3rem] max-h-[150px]",
        "overflow-y-auto",
        "whitespace-pre-wrap",
        "break-words"
      )}
    />
    <p className="text-sm mt-2 text-gray-500">
      Underline a word to convert it into a blank.
    </p>
  </div>
);

export default SentenceInput;
