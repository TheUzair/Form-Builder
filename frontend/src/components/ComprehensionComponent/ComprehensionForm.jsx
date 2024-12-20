// ComprehensionForm.jsx
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { MoreVertical, HelpCircle, Image, Calculator, Check } from "lucide-react";
import Sidebar from "../Sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const ComprehensionForm = () => {
	const [questions, setQuestions] = useState([
		{
			id: 1,
			title: "",
			type: "mcq", // Set default type to mcq
			points: "",
			negativePoints: "",
			selectedOption: "", // Add selectedOption for radio selection
			options: [
				{ id: 1, text: "First sample option" },
				{ id: 2, text: "Second sample option" },
				{ id: 3, text: "Third sample option" },
				{ id: 4, text: "Fourth sample option" },
			],
		},
	]);

	const handleOptionSelect = (questionId, value) => {
		setQuestions(questions.map(question =>
			question.id === questionId
				? { ...question, selectedOption: value }
				: question
		));
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-11">
					<Card className="p-6 shadow-lg rounded-lg bg-white">
						{/* Header Section */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-4">
								<div className="flex flex-wrap w-6 h-6">
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
								</div>
								<h2 className="text-lg font-semibold">Question 3</h2>
							</div>
							<Button variant="ghost" size="sm" className="h-8 w-8">
								<MoreVertical className="h-5 w-5" />
							</Button>
						</div>

						{/* Points and Question Type Section */}
						<div className="mb-6 flex justify-end gap-4">
							<div className="flex items-center gap-2">
								<Select>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select Question Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="comprehension">Comprehension</SelectItem>
									</SelectContent>
								</Select>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<HelpCircle className="h-5 w-5 text-blue-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p>Add comprehension questions with multiple sub-questions</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input type="number" placeholder="Points" className="w-24" />
						</div>

						{/* Description Section */}
						<div className="mb-6">
							<Textarea
								placeholder="Enter comprehension passage here..."
								className="min-h-[200px] w-3/5"
							/>
						</div>

						{/* Sub Questions Section */}
						{questions.map((question, index) => (
							<Card key={question.id} className="mb-4 p-4">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-4">
										<div className="flex flex-wrap w-6 h-6">
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
										</div>
										<h3 className="text-md font-semibold">Question 3.{index + 1}</h3>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="sm" className="h-8 w-8">
											<Image className="h-5 w-5" />
										</Button>
										<Button variant="ghost" size="sm" className="h-8 w-8">
											<MoreVertical className="h-5 w-5" />
										</Button>
									</div>
								</div>

								<div className="space-y-4">
									<Input placeholder="Question Title (Optional)" className="w-3/5" />

									<div className="flex justify-between items-center gap-4">
										<div className="relative w-[60%]">
											<Select>
												<SelectTrigger>
													<SelectValue placeholder="Question Type" />
												</SelectTrigger>
												<SelectContent
													position="popper"
													className={cn(
														"relative z-[9999] w-[var(--radix-select-trigger-width)]",
														"before:content-[''] before:fixed before:inset-0",
														"before:bg-black/20 before:backdrop-blur-sm before:-z-10"
													)}
													sideOffset={5}
												>
													<div className="bg-white rounded-md shadow-lg border">
														<SelectItem value="mcq" className="hover:bg-gray-100 cursor-pointer">
															MCQ (Single Correct)
														</SelectItem>
													</div>
												</SelectContent>
											</Select>
										</div>

										<div className="flex gap-2 w-[25%]">
											<div className="relative flex-1">
												<Input type="number" placeholder="Points" className="pr-8" />
												<Calculator className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
											</div>
											<div className="relative flex-1">
												<Input type="number" placeholder="Negative" className="pr-8" />
												<Calculator className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
											</div>
										</div>
									</div>

									{/* Options */}
									<div className="flex items-start gap-4">
										<div className="flex flex-wrap w-6 h-6 mt-2">
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
										</div>

										<div className="space-y-3 flex-1">
											<RadioGroup
												value={question.selectedOption}
												onValueChange={(value) => handleOptionSelect(question.id, value)}
											>
												<div className="space-y-3">
													{question.options.map((option) => (
														<div key={option.id} className="flex items-center space-x-3">
															<RadioGroupItem value={option.id.toString()} id={`option${option.id}`} />
															<label
																htmlFor={`option${option.id}`}
																className="text-sm cursor-pointer"
															>
																{option.text}
															</label>
														</div>
													))}
												</div>
											</RadioGroup>
										</div>
									</div>
								</div>
							</Card>
						))}
					</Card>
				</div>
				<div className="col-span-1">
					<Sidebar />
				</div>
			</div>
		</DndProvider>
	);
};

export default ComprehensionForm;