"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";

const CreateProjectPage = () => {
	const router = useRouter();
	const formSchema = z.object({
		name: z.string().min(2, "Project name should be at least 2 character long"),
		description: z
			.string()
			.max(600, "You have exceeded the max length for this field"),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		router.push("/project")
	};
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="max-w-[500px]">
				<header className="text-3xl font-semibold">
					Create a project to get you started
				</header>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8">
						<div className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project name</FormLabel>
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
										<FormLabel>Short description</FormLabel>
										<FormControl>
											<textarea
												className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-primary w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
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
						<Button type="submit" className="w-full mt-8 h-10">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default CreateProjectPage;
