import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "@/components/ui/card";
import PointsInput from "./PointsInput";
import DescriptionInput from "./DescriptionInput";
import CategoriesSection from "./CategoriesSection";
import TooltipButtons from "./TooltipButtons";
import ItemsSection from "./ItemsSection/ItemsSection";


const CategoriesForm = ({
	questionNumber,
	categories: initialCategories,
	items: initialItems,
	points,
	negativePoints,
	description,
	onAdd,
	onDelete,
	onSave,
	isSaving,
	onFormChange,
	formId
}) => {
	const updateForm = (updates) => {
		onFormChange({
			points,
			negativePoints,
			description,
			...updates,
		});
	};


	return (
		<DndProvider backend={HTML5Backend}>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-1 md:col-span-11">
					<Card className="p-4 md:p-6 shadow-lg rounded-lg bg-white">
						<div className="flex items-center justify-between mb-4 md:mb-6">
							<div className="flex items-center gap-4">
								<div className="flex flex-wrap w-6 h-6">
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
								</div>
								<h2 className="text-lg font-semibold">Question {questionNumber}</h2>
							</div>
							<TooltipButtons
								onAdd={onAdd}
								onDelete={onDelete}
								onSave={() => onSave(formId)}
								isSaving={isSaving}
							/>
						</div>
						<div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-28 my-6 md:my-12">
							<div className="w-full md:w-auto">
								<DescriptionInput
									description={description}
									onChange={updateForm}
								/>
							</div>
							<div className="w-full md:w-auto">
								<PointsInput
									points={points}
									negativePoints={negativePoints}
									onChange={updateForm}
								/>
							</div>
						</div>
						<div className="space-y-6">
							<CategoriesSection
								initialCategories={initialCategories}
								onChange={updateForm}
							/>
							<ItemsSection
								initialItems={initialItems}
								categories={initialCategories}
								onChange={updateForm}
							/>
						</div>
					</Card>
				</div>
			</div>
		</DndProvider>
	);
};

export default CategoriesForm;
