"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarCog, CheckIcon, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Datepicker from "@/components/global/Datepicker";
import { useState } from "react";
import { taskPriorityList } from "@/utils/constants";
import { useProject } from "@/store/useProject";
import { Collaborator } from "@/utils/types/api/project";
import { useUser } from "@/store";
import { TaskPriority, TaskType } from "@/utils/types/api/task";
import { useRouter, useSearchParams } from "next/navigation";
import { createTask } from "@/utils/api/tasks";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/utils/types";
dayjs.extend(localizedFormat);

const CreateTaskPage = () => {
	const params = useSearchParams();
	const router = useRouter()
	const { activeProject } = useProject();
	const { user } = useUser();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showStartDateSelect, setShowStartDateSelect] =
		useState<boolean>(false);
	const [selectedAssignees, setSelectedAssignees] = useState<Collaborator[]>(
		[]
	);
	const [showEndDateSelect, setShowEndDateSelect] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();
	const [priority, setPriority] = useState<TaskPriority>();
	const [taskType, setTaskType] = useState<TaskType>("TASK");
	const [createMore, setCreateMore] = useState<boolean>(false);
	const columnId = params.get("column") ?? undefined;

	const handleSelectAssignees = (
		val: boolean | string,
		member: Collaborator
	) => {
		if (val) {
			setSelectedAssignees((prev) => [...prev, member]);
		} else {
			setSelectedAssignees((prev) =>
				prev.filter((item) => item.id !== member.id)
			);
		}
	};

	const handleAssignYourself = () => {
		const you = activeProject?.collaborators.find(
			(item) => item.userId === user?.id
		);
		if (!you) return;
		setSelectedAssignees((prev) => [...prev, you]);
	};

	const formSchema = z.object({
		title: z
			.string()
			.nonempty("Project name is required")
			.min(2, "Project name should be at least 2 character long"),
		description: z.string(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const resetFields = () => {
		form.reset();
		setSelectedAssignees([]);
		setPriority(undefined);
		setTaskType("TASK");
		setStartDate(undefined);
		setEndDate(undefined);
	};

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		const payload = {
			...values,
			type: taskType,
			assignees: selectedAssignees.length
				? selectedAssignees.map((item) => item.id)
				: undefined,
			priority,
			columnId,
			startDate,
			endDate,
		};
		setIsSubmitting(true);
		try {
			await createTask(payload);
			setIsSubmitting(false);
			resetFields();
			toast.success("Task created");
			if (!createMore) router.push(`/project/${activeProject?.id}/tasks`);
		} catch (error) {
			setIsSubmitting(false);
			const apiError = error as AxiosError<ApiError>;
			toast.error(apiError.response?.data?.message || apiError.message);
		}
	};

	return (
		<div className="max-2xl:px-[24px] py-[24px]">
			<div className="2xl:w-[70%] m-[0px_auto] flex gap-8">
				<div className="flex-1">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<div className="space-y-8">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Task title</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Add a description</FormLabel>
											<FormControl>
												<textarea
													className={cn(
														"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-primary/40 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
														"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
													)}
													{...field}
													rows={10}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex items-center gap-3 mt-3">
								<Checkbox
									id="createMore"
									checked={createMore}
									onCheckedChange={(val) => setCreateMore(val as boolean)}
								/>
								<Label htmlFor="createMore">Create more</Label>
							</div>
							<Button
								type="submit"
								className="w-[200px] mt-8 h-10"
								loading={isSubmitting}
							>
								Create
							</Button>
						</form>
					</Form>
				</div>
				<div className="w-[300px] flex flex-col gap-6">
					<div className="text-sm border-b flex flex-col py-2 gap-2">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full h-[32px] justify-between px-1!"
								>
									Assignees <Settings />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-[300px] max-h-[300px] py-2 px-3 border border-black/30">
								<header className="text-sm font-semibold">
									Assign up to 10 people to this task
								</header>
								<DropdownMenuSeparator />

								<div className="mt-3 flex flex-col gap-2">
									{activeProject?.collaborators.map((member) => (
										<Label
											key={member.id}
											className="flex items-center gap-4 has-[[aria-checked=true]]:bg-blue-50 py-1 px-2"
										>
											<Checkbox
												onCheckedChange={(val) =>
													handleSelectAssignees(val, member)
												}
												checked={
													!!selectedAssignees.find(
														(item) => item.id === member.id
													)
												}
												id={`toggle-${member.id}`}
												className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
											/>
											<div className="flex items-center gap-2">
												<Avatar className="size-6">
													<AvatarImage src="https://github" />
													<AvatarFallback className="text-[10px] font-semibold bg-blue-100">
														{member?.user?.firstname?.charAt(0)}
														{member?.user?.lastname?.charAt(0)}
													</AvatarFallback>
												</Avatar>
												{member.user.firstname} {member.user.lastname}
											</div>
										</Label>
									))}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
						{!selectedAssignees.length ? (
							<div className="px-1">
								No one -{" "}
								<Button
									variant="link"
									className="py-0 px-4 h-auto"
									onClick={handleAssignYourself}
								>
									Assign yourself
								</Button>
							</div>
						) : (
							<div className="flex gap-2">
								{selectedAssignees?.map((a) => (
									<div
										key={a.id}
										className="bg-blue-100 w-max rounded px-2 py-[2px]"
									>
										{a.user.firstname} {a.user.lastname}
									</div>
								))}
							</div>
						)}
					</div>

					<div className="text-sm border-b flex flex-col py-2 gap-2">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full h-[32px] justify-between px-1!"
								>
									Priority <Settings />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-[300px] py-2 px-3 border border-black/30">
								<header className="text-sm font-semibold">
									Select task priority
								</header>
								<DropdownMenuSeparator />

								<div className="mt-3 flex flex-col gap-2">
									{taskPriorityList.map((item, idx) => (
										<DropdownMenuItem
											key={idx}
											className="text-base capitalize flex justify-between"
											onClick={() => setPriority(item.title)}
										>
											<div className="flex items-center gap-2">
												<span
													style={{ border: `3px solid ${item.color}` }}
													className="rounded-full block size-[15px]"
												/>
												{item.title.toLowerCase()}
											</div>

											{priority === item.title && (
												<CheckIcon className="text-emerald-600" />
											)}
										</DropdownMenuItem>
									))}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="px-1 capitalize">
							{priority?.toLowerCase() || "Not set"}
						</div>
					</div>

					<div className="text-sm border-b flex flex-col py-2 gap-2">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full h-[32px] justify-between px-1!"
								>
									Type <Settings />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-[300px] py-2 px-3 border border-black/30">
								<header className="text-sm font-semibold">
									Nature of task
								</header>
								<DropdownMenuSeparator />

								<div className="mt-3 flex flex-col gap-2">
									{["TASK", "BUG", "FEATURE"].map((item, idx: number) => (
										<DropdownMenuItem
											key={idx}
											className="text-base capitalize flex justify-between"
											onClick={() => setTaskType(item as typeof taskType)}
										>
											{item.toLowerCase()}

											{taskType === item && (
												<CheckIcon className="text-emerald-600" />
											)}
										</DropdownMenuItem>
									))}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="px-1 capitalize">
							{taskType.toLowerCase() || "Not set"}
						</div>
					</div>

					<div className="text-sm border-b flex flex-col py-2 gap-2">
						<DropdownMenu
							modal={false}
							open={showStartDateSelect}
							onOpenChange={setShowStartDateSelect}
						>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full h-[32px] justify-between px-1!"
								>
									Start date <CalendarCog />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-[300px]">
								<Datepicker
									mode="single"
									selectedDate={startDate}
									setSelectedDate={(date) => {
										setStartDate(date);
										setShowStartDateSelect(false);
									}}
									disabled={{ before: new Date(), after: endDate }}
								/>
							</DropdownMenuContent>
						</DropdownMenu>

						<div className="px-1">
							{startDate ? dayjs(startDate).format("LL") : "Not set"}
						</div>
					</div>

					<div className="text-sm flex flex-col py-2 gap-2">
						<DropdownMenu
							modal={false}
							open={showEndDateSelect}
							onOpenChange={setShowEndDateSelect}
						>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full h-[32px] justify-between px-1!"
								>
									End date <CalendarCog />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-[300px] py-2 px-3 border border-black/30">
								<Datepicker
									mode="single"
									selectedDate={endDate}
									setSelectedDate={(date) => {
										setEndDate(date);
										setShowEndDateSelect(false);
									}}
									disabled={[
										{ before: new Date() },
										...(startDate ? [{ before: startDate }] : []),
									]}
								/>
							</DropdownMenuContent>
						</DropdownMenu>

						<div className="px-1">
							{endDate ? dayjs(endDate).format("LL") : "Not set"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTaskPage;
