"use client";

import z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, MailIcon } from "lucide-react";
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
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";

const SignupPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const formSchema = z.object({
		firstname: z
			.string()
			.min(2, "Firstname should be at least 2 character long"),
		lastname: z.string().min(2, "Lastname should be at least 2 character long"),
		email: z.email().min(1, "Email is required"),
		password: z.string().min(8, "Password must be at least 8 characters"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<div className="h-full max-2xl:my-10 flex items-center justify-center pr-4 2xl:pr-8">
			<div className="lg:w-3/4 2xl:w-2/4">
				<div className="mb-10">
					<p className="text-4xl font-bold mb-[6px]">
						Let&apos;s get you set up
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="space-y-8">
							<FormField
								control={form.control}
								name="firstname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Firstname</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Lastname</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<InputGroup>
												<InputGroupInput type="email" {...field} />
												<InputGroupAddon>
													<MailIcon />
												</InputGroupAddon>
											</InputGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<InputGroup>
												<InputGroupInput
													type={showPassword ? "text" : "password"}
													{...field}
												/>
												<InputGroupAddon>
													<Lock />
												</InputGroupAddon>
												<InputGroupAddon align="inline-end">
													<InputGroupButton
														onClick={() => setShowPassword((prev) => !prev)}
													>
														{showPassword ? <EyeOff /> : <Eye />}
													</InputGroupButton>
												</InputGroupAddon>
											</InputGroup>
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

				<p className="text-center mt-4">
					Already have an account?{" "}
					<Link href="/login" className="underline">Login instead</Link>
				</p>
			</div>
		</div>
	);
};

export default SignupPage;
