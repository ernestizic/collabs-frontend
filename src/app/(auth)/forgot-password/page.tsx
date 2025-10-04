"use client";

import z from "zod";
import { Key, MailIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
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
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { usePathname, useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
	const pathname = usePathname();
	const router = useRouter();
	const formSchema = z.object({
		email: z.email().min(1, "Email is required"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		router.push(
			`${pathname}/verify-reset-code?email=${encodeURI(values.email)}`
		);
	};

	return (
		<div className="text-center">
			<div className="flex flex-col items-center gap-4 mb-8">
				<div className="border border-primary/50 size-[50px] flex items-center justify-center rounded-2xl">
					<Key />
				</div>
				<div>
					<p className="text-3xl font-semibold mb-[6px]">
						Forgot your password?
					</p>
					<p className="text-[14px] text-neutral-600">
						A code will be sent to your email to help reset your password
					</p>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-8 text-left"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<InputGroup>
										<InputGroupInput
											type="email"
											placeholder="Enter your email address"
											{...field}
										/>
										<InputGroupAddon>
											<MailIcon />
										</InputGroupAddon>
									</InputGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Send code
					</Button>
				</form>
			</Form>

			<Link
				href="/login"
				className="inline-flex items-center justify-center gap-4 mt-6"
			>
				<MoveLeft /> Back to login
			</Link>
		</div>
	);
};

export default ForgotPasswordPage;
