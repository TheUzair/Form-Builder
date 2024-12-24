import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CategoriesForm from "./CategoriesForm";
import { addCategorizeQuestion } from "@/services/endpoints";
import { saveCategorizeQuestionsBulk } from "@/services/endpoints";

const CategoriesFormContainer = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [forms, setForms] = useState([
    {
      id: 1,
      questionNumber: 1,
      categories: [
        { id: 1, name: "" }
      ],
      items: [
        { id: 1, name: "", category: "" }
      ],
      points: "",
      negativePoints: "",
      description: "",
    },
  ]);

  const getInitialFormState = (questionNumber) => ({
    id: Date.now(),
    questionNumber,
    categories: [{ id: 1, name: "" }],
    items: [{ id: 1, name: "", category: "" }],
    points: "",
    negativePoints: "",
    description: "",
  });

  const handleAdd = () => {
    const newQuestionNumber = forms.length + 1;
    setForms([
      ...forms,
      {
        id: Date.now(),
        questionNumber: newQuestionNumber,
        categories: [
          { id: 1, name: "" }
        ],
        items: [
          { id: 1, name: "", category: "" }
        ],
        points: "",
        negativePoints: "",
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

  const handleSave = async (formId) => {
    try {
      setIsSaving(true);
      console.log("Save button clicked for form:", formId);
      const formToSave = forms.find(form => form.id === formId);

      if (!formToSave) {
        throw new Error("Form not found");
      }

      const categorizeData = {
        questionNumber: formToSave.questionNumber,
        type: "categorize",
        points: formToSave.points,
        negativePoints: formToSave.negativePoints,
        description: formToSave.description,
        categories: formToSave.categories.map(category => ({
          id: category.id,
          name: category.name
        })),
        items: formToSave.items.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category
        }))
      };

      console.log("Sending data:", categorizeData);
      const response = await addCategorizeQuestion(categorizeData);
      console.log("Response:", response);

      // Clear only the saved form
      setForms(prevForms => prevForms.map(form =>
        form.id === formId
          ? {
            ...getInitialFormState(form.questionNumber),
            id: form.id  // Preserve the original form ID
          }
          : form
      ));

      toast({
        title: "Success",
        description: "Question saved successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error saving question:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save question",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const allCategorizeData = forms.map((form) => ({
        questionNumber: form.questionNumber,
        type: "categorize",
        points: form.points,
        negativePoints: form.negativePoints,
        description: form.description,
        categories: form.categories.map(category => ({
          id: category.id,
          name: category.name
        })),
        items: form.items.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category
        }))
      }));
      
      console.log("Payload to send:", allCategorizeData);
      const response = await saveCategorizeQuestionsBulk(allCategorizeData);
      console.log("Response:", response);
  
      setForms([getInitialFormState(1)]);
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
        <CategoriesForm
          key={form.id}
          formId={form.id}
          questionNumber={form.questionNumber}
          categories={form.categories}
          items={form.items}
          points={form.points}
          negativePoints={form.negativePoints}
          description={form.description}
          onAdd={handleAdd}
          onDelete={() => handleDelete(form.id)}
          onSave={handleSave}
          isSaving={isSaving}
          onFormChange={(updatedData) => handleFormChange(form.id, updatedData)}
        />
      ))}

      <div className="flex justify-center">
        <Button onClick={handleSaveAll} className="mt-4" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save All Questions'}
        </Button>
      </div>
    </div>
  );
};

export default CategoriesFormContainer;