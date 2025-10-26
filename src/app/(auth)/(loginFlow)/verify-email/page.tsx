"use client";

import z from "zod";
import { MailIcon } from "lucide-react";
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
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { resendEmailVerificationCode, verifyEmail } from "@/utils/api/auth";
import { useUser } from "@/store";
import { toast } from "sonner";
import { ApiError } from "@/utils/types";
import { AxiosError } from "axios";
import { useState } from "react";

const VerifyEmailPage = () => {
	const { user, setUser } = useUser();
	const router = useRouter();
	const [isSending, setIsSending] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formSchema = z.object({
		code: z
			.string()
			.min(6, "Code should be six digits")
			.max(6, "Code should not exceed six digits"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: "",
		},
	});

	const handleResend = async () => {
		if (!user) return;
		setIsSending(true);
		try {
			const data = await resendEmailVerificationCode({ email: user?.email });
			toast.success(data.message);
			setIsSending(false);
		} catch (error) {
			setIsSending(false);
			const err = error as AxiosError<ApiError>;
			toast.error(
				err.response?.data.message || "An error occurred. Try again!"
			);
		}
	};

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!user) return;
		setIsSubmitting(true);
		try {
			const data = await verifyEmail({ ...values, email: user?.email })
			setUser(data.data);
			toast.success(data.message ?? "Email verification successful");
			router.push(`/dashboard`);
		} catch (error) {
			setIsSubmitting(false);
			const err = error as AxiosError<ApiError>;
			toast.error(
				err.response?.data.message || "An error occurred. Try again!"
			);
		}
	};

	return (
		<div className="text-center">
			<div className="flex flex-col items-center gap-4 mb-8">
				<div className="border border-primary/50 size-[50px] flex items-center justify-center rounded-2xl">
					<MailIcon />
				</div>
				<div>
					<p className="text-3xl font-semibold mb-[6px]">Verify your email</p>
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="text-left">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the OTP sent to your email</FormLabel>
								<FormControl>
									<InputOTP
										maxLength={6}
										{...field}
										inputMode="numeric"
										pattern="[0-9]*"
									>
										<InputOTPGroup className="border flex items-center justify-center">
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						loading={isSubmitting}
						disabled={!form.formState.isValid || isSending || isSubmitting}
						type="submit"
						className="w-full h-[52px] text-base mt-8"
					>
						Submit
					</Button>
				</form>
			</Form>
			<p className="text-[14px] my-4">
				Didn&apos;t get any code?{" "}
				<button
					type="button"
					className="text-primary font-semibold disabled:opacity-50"
					onClick={handleResend}
					disabled={isSending || isSubmitting}
				>
					Click to resend
				</button>
			</p>
		</div>
	);
};

export default VerifyEmailPage;
