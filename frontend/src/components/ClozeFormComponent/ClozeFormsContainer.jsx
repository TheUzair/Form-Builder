import { useState } from "react";
import ClozeForm from "./ClozeForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { saveClozeQuestionsBulk } from "@/services/endpoints";

const ClozeFormsContainer = () => {
  const [forms, setForms] = useState([
    {
      id: 1,
      questionNumber: 1,
      sentence: "",
      options: [],
      points: 0,
      negativePoints: 0,
      description: "",
    },
  ]);

  const handleAdd = () => {
    const newQuestionNumber = forms.length + 1;
    setForms([
      ...forms,
      {
        id: Date.now(),
        questionNumber: newQuestionNumber,
        sentence: "",
        options: [],
        points: 0,
        negativePoints: 0,
        description: "",
      },
    ]);
  };

  const handleDelete = (formId) => {
    if (forms.length <= 1) {
      alert("Cannot delete the last form!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedForms = forms.filter((form) => form.id !== formId);
      const reorderedForms = updatedForms.map((form, index) => ({
        ...form,
        questionNumber: index + 1,
      }));
      setForms(reorderedForms);
    }
  };

  const handleSaveAll = async () => {
		try {
			const allClozeData = forms.map((form) => ({
				questionNumber: form.questionNumber,
				type: "cloze",
				points: form.points || 10,
				negativePoints: form.negativePoints || -1,
				description: form.description || "Fill in the blanks:",
				sentence: form.sentence || "The quick brown fox jumps over the lazy dog",
				underlinedWords: form.options.map((opt) => opt.word),
				options: form.options.map((opt) => opt.word),
			}));
			console.log("Payload to send:", allClozeData);
			await saveClozeQuestionsBulk(allClozeData);
			alert("All questions saved successfully!");
		} catch (error) {
			console.error("Error saving questions:", error);

			console.error("Error saving all questions:", error);
			alert("Error saving questions");
		}
	};
	
	

  const handleFormChange = (formId, updatedFormData) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, ...updatedFormData } : form
      )
    );
  };

  return (
    <div className="space-y-6">
      {forms.map((form) => (
        <ClozeForm
          key={form.id}
          formId={form.id}
          questionNumber={form.questionNumber}
          onAdd={handleAdd}
          onDelete={() => handleDelete(form.id)}
          onFormChange={(updatedData) => handleFormChange(form.id, updatedData)}
        />
      ))}

      {/* Save All Button */}
      <div className="flex justify-center">
        <Button onClick={handleSaveAll} className="mt-4">
          Save All Questions
        </Button>
      </div>
    </div>
  );
};

export default ClozeFormsContainer;
