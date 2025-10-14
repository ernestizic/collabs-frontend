import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { queryKeys } from "@/lib/queryKeys";
import { useProject } from "@/store/useProject";
import { deleteColumn } from "@/utils/api/project";
import { ApiError } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface PromptProps {
	onClose: () => void;
	columnId: string;
}
const DeleteColumnPrompt = ({ onClose, columnId }: PromptProps) => {
	const queryClient = useQueryClient();
	const { activeProject } = useProject();

	const deleteProjectMutation = useMutation({
		mutationFn: () => deleteColumn(columnId),
		onSuccess() {
      onClose()
			queryClient.invalidateQueries({
				queryKey: queryKeys.projectBoards(activeProject?.id as number),
			});
		},
		onError(error) {
			const err = error as AxiosError<ApiError>;
			toast.error(
				err.response?.data.message ?? "Unable to delete column. Try again"
			);
		},
	});
	return (
		<Dialog open>
			<DialogTrigger asChild></DialogTrigger>
			<DialogContent className="w-[420px]" showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className="text-center">Delete column ?</DialogTitle>
					<DialogDescription className="text-center text-base my-5">
						Are you sure you want to delete this column? Deleting this column
						will delete all tasks under it
					</DialogDescription>
				</DialogHeader>

				<div className="flex gap-6">
					<Button
						className="flex-1"
						variant="outline"
						onClick={onClose}
						disabled={deleteProjectMutation.isPending}
					>
						Cancel
					</Button>
					<Button
						className="flex-1 bg-[#982121]"
						variant="destructive"
						onClick={() => deleteProjectMutation.mutate()}
						loading={deleteProjectMutation.isPending}
					>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteColumnPrompt;
