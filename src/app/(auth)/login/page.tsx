"use client";

import z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, LogIn, MailIcon } from "lucide-react";
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

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const formSchema = z.object({
		email: z.email().min(1, "Email is required"),
		password: z.string().min(8, "Password must be at least 8 characters"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<div className="bg-gradient-to-b from-[#eec8fc] to-[#ffffff] w-[450px] rounded-2xl shadow-2xl p-8">
			<div className="flex flex-col items-center gap-4">
				<div className="border bg-[#fff] size-[50px] flex items-center justify-center rounded-2xl">
					<LogIn />
				</div>
				<div className="text-center">
					<p className="text-3xl font-semibold mb-[6px]">Welcome Back</p>
					<p className="text-[14px] text-neutral-600">
						Don&apos;t have an account yet?{" "}
						<Link href="/signup" className="font-semibold">
							Sign up
						</Link>
					</p>
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<InputGroup>
											<InputGroupInput
												type="email"
												placeholder="Email address"
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
												placeholder="Password"
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
					<Link
						href="/forgot-password"
						className="float-right text-sm mt-[4px]"
					>
						Forgot password?
					</Link>
					<Button type="submit" className="w-full mt-8 h-10">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginPage;
