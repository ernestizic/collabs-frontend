import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColumn } from "@/utils/api/project";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/utils/types";
import { Column, UpdateColumnPayload } from "@/utils/types/api/project";
import { useProject } from "@/store/useProject";

interface CreateColumnProps {
	onClose: () => void;
	column: Column;
}
const EditColumnModal = ({ onClose, column }: CreateColumnProps) => {
	const { activeProject } = useProject();
	const queryClient = useQueryClient();

	const formSchema = z.object({
		title: z.string().min(1, "Title is required"),
		color: z.string(),
		description: z
			.string()
			.max(60, "You have exceeded the max length for this field"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: column.name ?? "",
			description: column.description ?? "",
			color: column.identifier ?? "#999",
		},
	});

	const closeModal = () => {
		onClose();
		form.reset();
	};

	const updateColumnMutation = useMutation({
		mutationFn: (updateColumnPayload: UpdateColumnPayload) =>
			updateColumn(column.id, updateColumnPayload),
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

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		const createColumnPayload = {
			name: values.title,
			description: values.description,
			identifier: values.color,
		};
		updateColumnMutation.mutate(createColumnPayload);
	};

	return (
		<Dialog open onOpenChange={closeModal}>
			<DialogContent showCloseButton={false} className="">
				<DialogTitle className="sr-only">Update Column</DialogTitle>
				<DialogDescription className="sr-only">
					Modal with a form for updating the details of a column
				</DialogDescription>
				<div className="flex items-center justify-between">
					<header className="text-xl font-semibold">Update Column</header>
					<Button variant="outline" onClick={closeModal}>
						<X />
					</Button>
				</div>
				<Separator />

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="space-y-8">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Label text</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<fieldset>
								<legend className="text-sm font-medium text-foreground mb-2">
									Select color
								</legend>
								<div className="flex gap-4">
									{[
										{ color: "#999", name: "Gray" },
										{ color: "#0f53e7", name: "Blue" },
										{ color: "#4c6d4b", name: "Green" },
										{ color: "#000", name: "Black" },
										{ color: "#cb8757", name: "Brown" },
									].map(({ color, name }) => (
										<label key={color} className="relative cursor-pointer">
											<input
												type="radio"
												name="color"
												value={color}
												className="sr-only"
												onChange={() => form.setValue("color", color)}
												checked={form.watch("color") === color}
											/>
											<span
												className="block size-[24px] rounded-full border"
												style={{ backgroundColor: color }}
												aria-label={name}
												title={name}
											/>
											{form.watch("color") === color && (
												<span className="absolute inset-0 rounded-full border-3 border-blue-500 pointer-events-none" />
											)}
										</label>
									))}
								</div>
							</fieldset>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Short description</FormLabel>
										<FormControl>
											<textarea
												className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-primary w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
												{...field}
												rows={5}
												maxLength={600}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							className="w-full mt-8 h-10"
							loading={updateColumnMutation.isPending}
						>
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditColumnModal;
