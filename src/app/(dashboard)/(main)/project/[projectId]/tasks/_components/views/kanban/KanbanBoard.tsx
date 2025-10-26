import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUp10,
	Ellipsis,
	PencilLine,
	Trash2,
} from "lucide-react";
import { Plus } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import TaskCard from "./TaskCard";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { Column } from "@/utils/types/api/project";
import { useModal } from "@/hooks/useModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { fetchTasks } from "@/utils/api/tasks";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Skeleton } from "@/components/ui/skeleton";
import LoadMoreLoader from "@/components/global/LoadMoreLoader";

interface BoardInterface {
	board: Column;
	handleMoveLeft: (board: Column) => void;
	handleMoveRight: (board: Column) => void;
}
const KanbanBoard = ({
	board,
	handleMoveRight,
	handleMoveLeft,
}: BoardInterface) => {
	const { openModal } = useModal();
	const pathname = usePathname();
	const router = useRouter();

	const {
		data,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: queryKeys.tasksOnBoard(board.id),
		queryFn: ({ pageParam }) => fetchTasks(pageParam, board.id),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (
				lastPage.data.pagination.currentPage >=
				lastPage.data.pagination.totalPages
			) {
				return undefined;
			}
			return lastPageParam + 1;
		},
	});

	const { lastListElementRef } = useInfiniteScroll(
		isFetching,
		hasNextPage,
		fetchNextPage
	);

	return (
		<div className="h-full min-w-[350px] w-[350px] rounded-2xl bg-accent p-[16px] flex flex-col">
			<div className="flex flex-col gap-2 pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span
							style={{ backgroundColor: board.identifier ?? "#000" }}
							className="size-[8px] rounded-full block"
						/>
						<span className="font-semibold text-gray-700">{board.name}</span>
						<Badge className="bg-primary/8 text-black">
							{board.taskCount}
							{board.column_limit && `/${board.column_limit}`}
						</Badge>
					</div>
					<div className="flex gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="size-[28px]"
									variant="ghost"
									aria-label="Add task to this column"
									onClick={() =>
										router.push(`${pathname}/create?column=${board.id}`)
									}
								>
									<Plus />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								Add task to this column
							</TooltipContent>
						</Tooltip>

						<DropdownMenu modal={false}>
							<Tooltip>
								<TooltipTrigger asChild>
									<DropdownMenuTrigger asChild>
										<Button
											className="size-[28px]"
											variant="ghost"
											aria-label="More options"
										>
											<Ellipsis />
										</Button>
									</DropdownMenuTrigger>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									More column options
								</TooltipContent>
							</Tooltip>
							<DropdownMenuContent>
								<DropdownMenuLabel className="text-[#000]/60">
									Tasks
								</DropdownMenuLabel>
								<DropdownMenuItem variant="destructive" className="text-base">
									<Trash2 /> Delete all
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuLabel className="text-[#000]/60">
									Column
								</DropdownMenuLabel>
								<DropdownMenuItem
									className="text-base"
									onClick={() => openModal("setLimitModal", { column: board })}
								>
									<ArrowUp10 /> Set limit
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-base"
									onClick={() =>
										openModal("updateColumnModal", { column: board })
									}
								>
									<PencilLine /> Edit details
								</DropdownMenuItem>

								<DropdownMenuItem
									variant="destructive"
									className="text-base"
									onClick={() =>
										openModal("deleteColumnPrompt", { columnId: board.id })
									}
								>
									<Trash2 /> Delete
								</DropdownMenuItem>

								<DropdownMenuSeparator />
								<DropdownMenuLabel className="text-[#000]/60">
									Position
								</DropdownMenuLabel>
								<DropdownMenuItem
									className="text-base"
									onClick={() => handleMoveLeft(board)}
								>
									<ArrowLeft /> Move left
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-base"
									onClick={() => handleMoveRight(board)}
								>
									<ArrowRight /> Move right
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<p
					title={board.description ?? ""}
					className="text-sm text-[#000]/60 truncate"
				>
					{board.description}
				</p>
			</div>

			<div className="flex-1 overflow-auto flex flex-col gap-2">
				{isLoading
					? Array.from({ length: 2 }).map((_, idx) => (
							<div className="bg-white p-[8px] rounded border" key={idx}>
								<Skeleton className="h-[12px] w-[100px]" />
								<div className="flex flex-col gap-[3px] mt-4">
									<Skeleton className="h-[12px] w-1/2" />
									<Skeleton className="h-[12px] w-10/12" />
								</div>
								<div className="flex justify-between gap-[3px] mt-6">
									<Skeleton className="h-[12px] w-[100px]" />
									<Skeleton className="h-[12px] w-[100px]" />
								</div>
							</div>
					  ))
					: data?.pages.map((page) => {
							return page.data.tasks.map((task, idx) => (
								<TaskCard
									key={task.id}
									task={task}
									ref={
										page.data.tasks.length === idx + 1
											? lastListElementRef
											: null
									}
								/>
							));
					  })}
			</div>
			{isFetchingNextPage && <LoadMoreLoader />}
		</div>
	);
};

export default KanbanBoard;
