import KanbanBoard from "./KanbanBoard";
import CreateColumn from "./CreateColumn";
import { BoardType } from "../../../types";
import { useState } from "react";

const boards = [
	{
		id: "1",
		name: "Backlog",
		description: "This item is yet to start",
		position: 1,
		color_identifier: "#1f6feb",
	},
	{
		id: "2",
		name: "In progress",
		description: "This is actively being worked on",
		position: 2,
		color_identifier: "#9e6a03",
	},
	{
		id: "3",
		name: "In review",
		description: "This has is in review",
		position: 3,
		color_identifier: "#8957e5",
	},
	{
		id: "4",
		name: "Done",
		description: "This has been completed",
		position: 4,
		color_identifier: "#238636",
	},
];

const KanbanView = () => {
	const [kanbanBoards, setKanbanBoards] = useState(boards);

	const handleMoveLeft = (board: BoardType) => {
		const currentBoards = [...kanbanBoards];

		const indexOfBoard = currentBoards.findIndex((b) => b.id === board.id);

		if (indexOfBoard <= 0) return;

		const itemToSwitch = currentBoards[indexOfBoard - 1];

		const newArr = currentBoards.map((item) => {
			if (item.id === itemToSwitch.id) {
				return {
					...item,
					position: board.position,
				};
			} else if (item.id === board.id) {
				return {
					...item,
					position: itemToSwitch.position,
				};
			}
			return {
				...item,
			};
		});
		newArr.sort((a, b) => a.position - b.position);
		setKanbanBoards(newArr);
	};

	const handleMoveRight = (board: BoardType) => {
		const currentBoards = [...kanbanBoards];
		const currentIndex = currentBoards.findIndex((b) => b.id === board.id);
		if (currentIndex >= currentBoards.length - 1) return;

		const rightBoard = currentBoards[currentIndex + 1];

		const updatedBoards = currentBoards.map((b) => {
			if (b.id === board.id) {
				return { ...b, position: rightBoard.position };
			} else if (b.id === rightBoard.id) {
				return { ...b, position: board.position };
			}
			return b;
		});

		updatedBoards.sort((a, b) => a.position - b.position);
		setKanbanBoards(updatedBoards);
	};
	return (
		<div className="h-full flex gap-2 overflow-auto">
			{kanbanBoards.map((item, idx) => (
				<KanbanBoard
					key={idx}
					board={item}
					handleMoveLeft={handleMoveLeft}
					handleMoveRight={handleMoveRight}
				/>
			))}
			<CreateColumn />
		</div>
	);
};

export default KanbanView;
