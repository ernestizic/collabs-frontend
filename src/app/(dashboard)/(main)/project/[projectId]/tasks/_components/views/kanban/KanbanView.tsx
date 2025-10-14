import KanbanBoard from "./KanbanBoard";
import { useState } from "react";
import { getColumns } from "@/utils/api/project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { queryKeys } from "@/lib/queryKeys";
import { Column } from "@/utils/types/api/project";
import NoBoardState from "./NoBoardState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import useProjectPusher from "@/hooks/useProjectPusher";
import { BarLoader } from "react-spinners";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const KanbanView = () => {
	const { openModal } = useModal();
	const { projectId } = useParams();
	useProjectPusher(Number(projectId));

	const { isPending, isError, data, error } = useQuery({
		queryKey: queryKeys.projectBoards(Number(projectId)),
		queryFn: () => getColumns(Number(projectId)),
		enabled: !!projectId,
	});
	const boards = data?.data ?? [];
	const [kanbanBoards, setKanbanBoards] = useState(boards);

	const handleMoveLeft = (board: Column) => {
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

	const handleMoveRight = (board: Column) => {
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

	if (isPending) {
		return (
			<div className="h-full w-full flex items-center justify-center flex-col">
				<BarLoader width={150} className="rounded-2xl" />
				Loading...
			</div>
		);
	}

	if (boards.length < 1 && !isPending) {
		return (
			<div>
				<NoBoardState openModal={() => openModal("createBoardModal")} />
			</div>
		);
	}
	return (
		<div className="h-full flex gap-2 overflow-auto">
			{boards.map((item, idx) => (
				<KanbanBoard
					key={idx}
					board={item}
					handleMoveLeft={handleMoveLeft}
					handleMoveRight={handleMoveRight}
				/>
			))}

			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						aria-label="Add column"
						onClick={() =>
							openModal("createBoardModal", { isComing: false, isGoing: true })
						}
					>
						<Plus />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					Add a new column to the board
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default KanbanView;
