import { useState } from "react";
import ClozeForm from "./ClozeForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveClozeQuestionsBulk } from "@/services/endpoints";

const ClozeFormsContainer = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
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

  const handleFormChange = (formId, updatedFormData) => {
    console.log('Receiving form change:', {
      formId,
      updatedFormData
    });

    setForms(prevForms => {
      const newForms = prevForms.map(form => {
        if (form.id === formId) {
          const updatedForm = {
            ...form,
            ...updatedFormData
          };
          console.log('Updated form:', updatedForm);
          return updatedForm;
        }
        return form;
      });
      console.log('New forms state:', newForms);
      return newForms;
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // current state
      console.log('Forms before save:', forms);

      const emptyForms = forms.filter(form => {
        const isEmpty = !form.sentence || !form.sentence.trim();
        console.log(`Checking form ${form.questionNumber}:`, {
          sentence: form.sentence,
          isEmpty
        });
        return isEmpty;
      });

      if (emptyForms.length > 0) {
        console.log('Empty forms found:', emptyForms);
        alert("Please enter sentences for all questions");
        return;
      }

      const questionsPayload = forms.map(form => {
        // Create a temporary div to extract raw text from HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = form.sentence;
        const rawSentence = tempDiv.textContent || tempDiv.innerText;

        return {
          questionNumber: Number(form.questionNumber),
          type: 'cloze',
          points: Number(form.points) || 0,
          negativePoints: Number(form.negativePoints) || 0,
          description: String(form.description || "Fill in the blanks:"),
          sentence: form.sentence.trim(), 
          rawSentence: rawSentence.trim(),
          blanks: form.options.map(opt => ({
            word: String(opt.word),
            index: rawSentence.indexOf(opt.word)
          })),
          underlinedWords: form.options.map(opt => String(opt.word)),
          options: form.options.map(opt => String(opt.word))
        };
      });

      console.log('Sending payload:', questionsPayload);

      const response = await saveClozeQuestionsBulk(questionsPayload);
      console.log('Save response:', response);

      // Reset forms
      setForms([
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

      toast({
        title: "Success",
        description: "All questions saved successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error saving questions:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save questions",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <div className="space-y-6">
      {forms.map((form) => (
        <ClozeForm
          key={form.id}
          formId={form.id}
          questionNumber={form.questionNumber}
          sentence={form.sentence}
          options={form.options}
          points={form.points}
          negativePoints={form.negativePoints}
          description={form.description}
          onAdd={handleAdd}
          onDelete={() => handleDelete(form.id)}
          onFormChange={(updatedData) => handleFormChange(form.id, updatedData)}
        />
      ))}

      <div className="flex justify-center">
        <Button onClick={handleSaveAll} className="mt-4">
          Save All Questions
        </Button>
      </div>
    </div>
  );
};

export default ClozeFormsContainer;
