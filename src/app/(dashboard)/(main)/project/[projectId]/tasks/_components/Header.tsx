"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { List, SquareKanban, Table } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { TaskViewKey } from "../types";

const views = [
	{
		title: "kanban",
		icon: <SquareKanban />,
	},
	{
		title: "list",
		icon: <List />,
	},
	{
		title: "table",
		icon: <Table />,
	},
];

interface HeaderProps {
	view: TaskViewKey;
	setView: Dispatch<SetStateAction<TaskViewKey>>;
}
const Header = ({ view, setView }: HeaderProps) => {
	const { setParam } = useQueryParams();

	return (
		<div className="flex gap-2 border-b">
			{views.map((item, idx) => (
				<Button
					onClick={() => {
						setView(item.title as TaskViewKey);
						setParam("view", item.title);
					}}
					variant="outline"
					key={idx}
					className={cn(
						"mt-0.5 border-b-0 border-x-0 border-t-0 rounded-none text-lg capitalize",
						{
							"border-b-2 border-primary text-primary": item.title === view,
						}
					)}
				>
					{item.icon}
					{item.title}
				</Button>
			))}
		</div>
	);
};

export default Header;
