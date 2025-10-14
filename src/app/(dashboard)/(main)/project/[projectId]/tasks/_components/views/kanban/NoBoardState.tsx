import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

interface NoBoardStateProps {
	openModal: () => void;
}
const NoBoardState = ({ openModal }: NoBoardStateProps) => {
	return (
		<div>
			<Empty>
				<EmptyHeader className="max-w-[400px]">
					<EmptyTitle className="text-3xl font-bold">No Boards Yet</EmptyTitle>
					<EmptyDescription className="text-lg">
						Create boards to show the stages of all your tasks.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button onClick={openModal}>Create board</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
};

export default NoBoardState;
