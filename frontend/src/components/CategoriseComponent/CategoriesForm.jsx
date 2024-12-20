import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MoreVertical, Plus, HelpCircle, X } from "lucide-react";
import Sidebar from "../Sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const CategoriesForm = () => {
	const [categories, setCategories] = useState([{ id: 1, name: "" }]);
	const [items, setItems] = useState([{ id: 1, name: "", category: "" }]);

	const addCategory = () => {
		setCategories([...categories, { id: categories.length + 1, name: "" }]);
	};

	const addItem = () => {
		setItems([...items, { id: items.length + 1, name: "", category: "" }]);
	};

	const deleteCategory = (id) => {
		if (categories.length > 1) {
			setCategories(categories.filter(category => category.id !== id));
		}
	};

	const deleteItem = (id) => {
		if (items.length > 1) {
			setItems(items.filter(item => item.id !== id));
		}
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-11">
					<Card className="p-6 shadow-lg rounded-lg bg-white">
						
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-4">
								<div className="flex flex-wrap w-6 h-6">
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
								</div>
								<h2 className="text-lg font-semibold">Question 2</h2>
							</div>
							<Button variant="ghost" size="sm" className="h-8 w-8">
								<MoreVertical className="h-5 w-5" />
							</Button>
						</div>

						
						<div className="mb-6 flex justify-end gap-4">
							<div className="flex items-center gap-2">
								<Select>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select Question Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="categorize">Categorize</SelectItem>
									</SelectContent>
								</Select>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<HelpCircle className="h-5 w-5 text-blue-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p>Categorize items into their respective categories</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Input type="number" placeholder="Points" className="w-24" />
						</div>
						
						<div className="mb-6">
							<Input placeholder="Description (Optional)" className="w-3/5" />
						</div>

						
						<div className="mb-6">
							<h3 className="text-md font-semibold mb-4">Categories</h3>
							{categories.map((category, index) => (
								<div key={category.id} className="flex items-center gap-4 mb-3">
									<div className="flex flex-wrap w-6 h-6">
										<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
										<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
										<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
										<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
									</div>
									<div className="flex-1 flex items-center gap-2">
										<Input
											placeholder={`Category ${index + 1}`}
										className="w-1/4"
										/>
										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
											onClick={() => deleteCategory(category.id)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
							<Button
								variant="ghost"
								onClick={addCategory}
								className="mt-2"
							>
								<Plus className="h-4 w-4 mr-2" />
								Add Category
							</Button>
						</div>

						
						<div>
							<h3 className="text-md font-semibold mb-4">Items</h3>
							{items.map((item, index) => (
								<div key={item.id} className="grid grid-cols-2 gap-4 mb-3">
									<div className="flex items-center gap-4">
										<div className="flex flex-wrap w-6 h-6">
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
											<div className="w-2 h-2 rounded-full bg-gray-400 m-0.5"></div>
										</div>
										<div className="flex-1 flex items-center gap-2">
											<Input className="w-2/5" placeholder={`Item ${index + 1}`} />
											<Button
												variant="ghost"
												size="sm"
												className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
												onClick={() => deleteItem(item.id)}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									</div>
									<div className="relative">
										<Select>
											<SelectTrigger className="w-1/2">
												<SelectValue placeholder="Choose Category" />
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
													{categories.length > 0 ? (
														categories.map((category, idx) => (
															<SelectItem
																key={category.id}
																value={`category-${idx + 1}`}
																className="hover:bg-gray-100 cursor-pointer"
															>
																
															</SelectItem>
														))
													) : (
														<div className="p-2 text-gray-500">No categories available</div>
													)}
												</div>
											</SelectContent>
										</Select>
									</div>
								</div>
							))}
							<Button
								variant="ghost"
								onClick={addItem}
								className="mt-2"
							>
								<Plus className="h-4 w-4 mr-2" />
								Add Item
							</Button>
						</div>
					</Card>
				</div>
				<div className="col-span-1">
					<Sidebar />
				</div>

			</div>
		</DndProvider>
	);
};

export default CategoriesForm;
