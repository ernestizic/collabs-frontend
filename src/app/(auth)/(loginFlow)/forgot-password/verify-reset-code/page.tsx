"use client";

import z from "zod";
import { MailIcon, MoveLeft } from "lucide-react";
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
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const VerifyResetPasswordCodePage = () => {
	const router = useRouter();
	const searchParam = useSearchParams();
	const email = searchParam.get("email");

	const maskedEmail = useMemo(() => {
		if (!email) return;
		const atIndex = email.indexOf("@");
		const username = email.slice(0, 3);
		const domain = email.slice(atIndex);
		const restOfUsername = email.slice(3, atIndex);
		return `${username} ${`*`.repeat(restOfUsername.length)} ${domain}`;
	}, [email]);

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

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		router.push(`/forgot-password/reset-password`)
	};
	return (
		<div className="text-center">
			<div className="flex flex-col items-center gap-4 mb-8">
				<div className="border border-primary/50 size-[50px] flex items-center justify-center rounded-2xl">
					<MailIcon />
				</div>
				<div>
					<p className="text-3xl font-semibold mb-[6px]">Check your email</p>
					<p className="text-[14px] text-neutral-600">
						Input the code that was sent to {maskedEmail}
					</p>
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

					<Button type="submit" className="w-full h-[52px] text-base mt-8">
						Submit
					</Button>
				</form>
			</Form>
			<p className="text-[14px] my-4">
				Didn&apos;t get any code? <button type="button" className="text-primary font-semibold">Click to resend</button>
			</p>

			<Link
				href="/login"
				className="inline-flex items-center justify-center gap-4 mt-6"
			>
				<MoveLeft /> Back to login
			</Link>
		</div>
	);
};

export default VerifyResetPasswordCodePage;
