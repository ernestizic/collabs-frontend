"use client";

import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, MoveLeft } from "lucide-react";
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { resetPassword } from "@/utils/api/auth";
import { AxiosError } from "axios";
import { ApiError } from "@/utils/types";

const ResetPasswordPage = () => {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const code = searchParams.get("code");

	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const router = useRouter();

	const formSchema = z
		.object({
			password: z
				.string()
				.min(8, { message: "Password must be at least 8 characters" }),
			confirm_password: z.string(),
		})
		.refine((data) => data.password === data.confirm_password, {
			path: ["confirm_password"],
			message: "Passwords do not match",
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			password: "",
			confirm_password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!email || !code) return;
		setIsLoading(true);
		const resetPasswordData = {
			email,
			code,
			password: values.password,
		};
		try {
			const data = await resetPassword(resetPasswordData);
			toast.success(data.message ?? "Password reset successful");
			router.push(`/login`);
		} catch (err) {
			setIsLoading(false);
			const error = err as AxiosError<ApiError>;
			toast.error(error.response?.data.message ?? "An error occurred");
		}
	};

	if (!email || !code) redirect("/forgot-password");

	return (
		<div>
			<div className="flex flex-col items-center gap-4 mb-8 w-[85%] mx-auto">
				<div className="border border-primary/50 size-[50px] flex items-center justify-center rounded-2xl">
					<Lock />
				</div>
				<div className="text-center">
					<p className="text-3xl font-semibold mb-[6px]">Set a new password</p>
					<p className="text-lg text-neutral-600">
						Ensure to set a strong password and try not to forget it again 😏
					</p>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-[400px] mx-auto"
				>
					<div className="space-y-8">
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
												autoComplete="off"
												{...field}
											/>
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
						<FormField
							control={form.control}
							name="confirm_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<InputGroup>
											<InputGroupInput
												type={showConfirmPassword ? "text" : "password"}
												placeholder="Confirm your password"
												autoComplete="off"
												{...field}
											/>
											<InputGroupAddon align="inline-end">
												<InputGroupButton
													onClick={() =>
														setShowConfirmPassword((prev) => !prev)
													}
												>
													{showConfirmPassword ? <EyeOff /> : <Eye />}
												</InputGroupButton>
											</InputGroupAddon>
										</InputGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type="submit"
						className="w-full mt-8 h-10"
						disabled={!form.formState.isValid || isLoading}
						loading={isLoading}
					>
						Submit
					</Button>
				</form>
			</Form>

			<div className="text-center">
				<Link
					href={`/forgot-password/verify-reset-code?email=ilo@yopmail.com`}
					className="inline-flex items-center justify-center gap-4 mt-6"
				>
					<MoveLeft /> Resend code
				</Link>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
