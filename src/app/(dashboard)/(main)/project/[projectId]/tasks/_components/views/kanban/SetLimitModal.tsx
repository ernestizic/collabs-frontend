import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/lib/queryKeys";
import { useProject } from "@/store/useProject";
import { updateColumn } from "@/utils/api/project";
import { ApiError } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column, UpdateColumnPayload } from "@/utils/types/api/project";

interface PromptProps {
	onClose: () => void;
	column: Column;
}
const SetLimitModal = ({ onClose, column }: PromptProps) => {
	const queryClient = useQueryClient();
	const { activeProject } = useProject();

	const formSchema = z.object({
		limit: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			limit: column.column_limit?.toString() ?? "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLimitMutation.mutate({ column_limit: Number(values.limit) });
	};

	const setLimitMutation = useMutation({
		mutationFn: (updateColumnType: UpdateColumnPayload) =>
			updateColumn(column.id, updateColumnType),
		onSuccess() {
			onClose();
			queryClient.invalidateQueries({
				queryKey: queryKeys.projectBoards(activeProject?.id as number),
			});
		},
		onError(error) {
			const err = error as AxiosError<ApiError>;
			toast.error(
				err.response?.data.message ?? "Unable to update limit. Try again"
			);
		},
	});
	return (
		<Dialog open>
			<DialogTrigger asChild></DialogTrigger>
			<DialogContent className="w-[420px] p-0" showCloseButton={false}>
				<DialogHeader className="border-b p-4">
					<DialogTitle>Set limit</DialogTitle>
					<DialogDescription className="text-center text-base my-5 sr-only">
						Set a limit for the number of tasks that can live in this column at
						once
					</DialogDescription>
				</DialogHeader>

				<div className=" p-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="limit"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Column limit</FormLabel>
										<FormControl>
											<Input type="number" min={0} {...field} />
										</FormControl>
										<FormMessage />
										<FormDescription>
											A limit on the number of items in a column
										</FormDescription>
									</FormItem>
								)}
							/>

							<div className="flex justify-end gap-6 mt-6">
								<Button
									variant="outline"
									onClick={onClose}
									disabled={setLimitMutation.isPending}
									type="button"
								>
									Cancel
								</Button>
								<Button type="submit" loading={setLimitMutation.isPending}>
									Save
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SetLimitModal;
