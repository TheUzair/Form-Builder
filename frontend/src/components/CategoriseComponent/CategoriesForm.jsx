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
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-11">
					<Card className="p-6 shadow-lg rounded-lg bg-white">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-lg font-semibold">Question {questionNumber}</h2>
							<TooltipButtons 
                onAdd={onAdd} 
                onDelete={onDelete} 
                onSave={() => onSave(formId)}
								isSaving={isSaving}
              />
						</div>
						<div className="flex items-center gap-28 my-12">
							<DescriptionInput
								description={description}
								onChange={updateForm}
							/>
							<PointsInput
								points={points}
								negativePoints={negativePoints}
								onChange={updateForm}
							/>
						</div>
						<CategoriesSection
							initialCategories={initialCategories}
							onChange={updateForm}
						/>
						<ItemsSection
							initialItems={initialItems}
							categories={initialCategories}
							onChange={updateForm}
						/>
					</Card>
				</div>
			</div>
		</DndProvider>
	);
};

export default CategoriesForm;
