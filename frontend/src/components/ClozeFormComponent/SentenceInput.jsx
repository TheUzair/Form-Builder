import { Label } from "@/components/ui/label";

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
      className="w-3/5 mt-2 h-12 border rounded-md p-2 outline-none"
      style={{ minHeight: "3rem" }}
    />
    <p className="text-sm mt-2 text-gray-500">Underline a word to convert it into a blank.</p>
  </div>
);

export default SentenceInput;
