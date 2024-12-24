import { useState } from "react";
import ComprehensionForm from "./ComprehensionForm";
import { Button } from "@/components/ui/button";
import { saveComprehensionQuestionsBulk } from "@/services/endpoints";
import { useToast } from "@/hooks/use-toast";

const ComprehensionFormsContainer = () => {
	const { toast } = useToast();
	const [forms, setForms] = useState([
		{
			id: 1,
			questionNumber: 1,
			type: "comprehension",
			points: "",
			negativePoints: "",
			description: "Read the passage and answer the questions below.",
			passage: "",
			subQuestions: [
				{
					id: 1,
					title: "",
					type: "mcq",
					points: "",
					negativePoints: "",
					options: [
						{
							id: 1,
							text: "",
							isCorrect: false,
						},
						{
							id: 2,
							text: "",
							isCorrect: false,
						},
						{
							id: 3,
							text: "",
							isCorrect: false,
						},
						{
							id: 4,
							text: "",
							isCorrect: false,
						},
					],
				},
			],
		},
	]);

	const handleAdd = () => {
		const newQuestionNumber = forms.length + 1;
		setForms([
			...forms,
			{
				id: Date.now(),
				questionNumber: newQuestionNumber,
				type: "comprehension",
				points: "",
				negativePoints: "",
				description: "Read the passage and answer the questions below.",
				passage: "",
				subQuestions: [
					{
						id: 1,
						title: "",
						type: "mcq",
						points: "",
						negativePoints: "",
						options: [
							{
								id: 1,
								text: "",
								isCorrect: false,
							},
							{
								id: 2,
								text: "",
								isCorrect: false,
							},
							{
								id: 3,
								text: "",
								isCorrect: false,
							},
							{
								id: 4,
								text: "",
								isCorrect: false,
							},
						],
					},
				],
			},
		]);
	};


	const handleDelete = (formId) => {

		if (forms.length <= 1) {
			toast({
				title: "Action Not Allowed",
				description: "Cannot delete the last form!",
				variant: "destructive",
			});
			return;
		}

		toast({
			title: "Confirm Deletion",
			description: "Are you sure you want to delete this question?",
			variant: "warning",
			action: (
				<Button
					variant="destructive"
					onClick={() => {
						const updatedForms = forms.filter((form) => form.id !== formId);
						const reorderedForms = updatedForms.map((form, index) => ({
							...form,
							questionNumber: index + 1,
						}));
						setForms(reorderedForms);
					}}
				>
					Confirm
				</Button>
			),
		});
	};

	const handleSaveAll = async () => {
		try {
			const allComprehensionData = forms.map((form) => ({
				questionNumber: form.questionNumber,
				type: "comprehension",
				points: form.points,
				negativePoints: form.negativePoints,
				description: form.description,
				passage: form.passage,
				subQuestions: form.subQuestions.map(question => ({
					id: question.id,
					title: question.title,
					type: question.type,
					points: question.points,
					negativePoints: question.negativePoints,
					options: question.options.map(option => ({
						id: option.id,
						text: option.text,
						isCorrect: option.isCorrect
					}))
				}))
			}));

			const isValid = allComprehensionData.every(form => {
				if (!form.passage.trim()) return false;
				return form.subQuestions.every(q =>
					q.title.trim() &&
					q.options.some(opt => opt.text.trim()) &&
					q.options.some(opt => opt.isCorrect)
				);
			});

			if (!isValid) {
				alert("Please fill in all required fields and ensure each question has at least one correct answer.");
				return;
			}

			console.log("Payload to send:", allComprehensionData);
			await saveComprehensionQuestionsBulk(allComprehensionData);
			alert("All questions saved successfully!");
		} catch (error) {
			console.error("Error saving questions:", error);
			alert("Error saving questions: " + (error.message || "Unknown error occurred"));
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
		<div className="space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6">
			<div className="space-y-4 sm:space-y-6">
				{forms.map((form) => (
					<ComprehensionForm
						key={form.id}
						formId={form.id}
						questionNumber={form.questionNumber}
						points={form.points}
						negativePoints={form.negativePoints}
						description={form.description}
						passage={form.passage}
						subQuestions={form.subQuestions}
						onAdd={handleAdd}
						onDelete={() => handleDelete(form.id)}
						onFormChange={(updatedData) => handleFormChange(form.id, updatedData)}
					/>
				))}
			</div>

			<div className="flex justify-center px-4 sm:px-0">
				<Button
					onClick={handleSaveAll}
					className="w-full sm:w-auto mt-2 sm:mt-4"
				>
					Save All Questions
				</Button>
			</div>
		</div>
	);
};

export default ComprehensionFormsContainer;