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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarCog, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Datepicker from "@/components/global/Datepicker";
import { useState } from "react";
dayjs.extend(localizedFormat);

const CreateTaskPage = () => {
	const [showStartDateSelect, setShowStartDateSelect] =
		useState<boolean>(false);
	const [showEndDateSelect, setShowEndDateSelect] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	const formSchema = z.object({
		title: z
			.string()
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

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
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
							<Button type="submit" className="w-[200px] mt-8 h-10">
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
							<DropdownMenuContent className="min-w-[300px] py-2 px-3 border border-black/30">
								<header className="text-sm font-semibold">
									Assign up to 10 people to this task
								</header>
								<DropdownMenuSeparator />

								<div className="mt-3 flex flex-col gap-2">
									{Array.from({ length: 3 }).map((item, idx) => (
										<Label
											key={idx}
											className="flex items-center gap-4 has-[[aria-checked=true]]:bg-blue-50 py-1 px-2"
										>
											<Checkbox
												id={`toggle-${idx}`}
												className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
											/>
											<div className="flex items-center gap-2">
												<Avatar className="size-6">
													<AvatarImage src="https://github.com/shadcn.png" />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
												ernestizic
											</div>
										</Label>
									))}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="px-1">
							No one -{" "}
							<Button variant="link" className="py-0 px-4 h-auto">
								Assign yourself
							</Button>
						</div>
					</div>

					<div className="text-sm border-b flex flex-col py-2 gap-2">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full h-[32px] justify-between px-1!"
								>
									Labels <Settings />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-[300px] py-2 px-3 border border-black/30">
								<header className="text-sm font-semibold">
									Assign up to 10 people to this task
								</header>
								<DropdownMenuSeparator />

								<div className="mt-3 flex flex-col gap-2">
									{Array.from({ length: 3 }).map((item, idx) => (
										<Label
											key={idx}
											className="flex items-center gap-4 has-[[aria-checked=true]]:bg-blue-50 py-1 px-2"
										>
											<Checkbox
												id={`toggle-${idx}`}
												className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
											/>
											<div className="flex items-center gap-2">
												<Avatar className="size-6">
													<AvatarImage src="https://github.com/shadcn.png" />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
												ernestizic
											</div>
										</Label>
									))}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="px-1">No label</div>
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
