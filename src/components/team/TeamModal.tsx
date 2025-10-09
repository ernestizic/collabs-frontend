import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { UserRoundPlus, X } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import MembersList from "./MembersList";

const TeamModal = () => {
	const [openModal, setOpenModal] = useState(false);

	const formSchema = z.object({
		email: z.email().min(1, "Email is required"),
		role: z.string().min(1, "Role is required"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			role: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button>
					<UserRoundPlus /> Invite Member
				</Button>
			</DialogTrigger>
			<DialogContent
				showCloseButton={false}
				className="max-w-[80%]! w-[1000px]! p-0 max-h-[90vh] overflow-auto"
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Invite Members</DialogTitle>
					<DialogDescription>
						Modal to invite team members to collaborate on your project
					</DialogDescription>
				</DialogHeader>

				<div className="flex items-center justify-between border-b py-[16px] px-[24px] bg-white sticky top-0 z-4">
					<header className="text-xl font-semibold">Invite members</header>
					<Button variant="ghost" onClick={() => setOpenModal(false)}>
						<X />
					</Button>
				</div>

				<div className="px-[24px] py-6">
					<div className="flex gap-15">
						<div className="w-[30%] text-gray-600">
							<p>Unused invitations expire after a period of 30 days.</p>
						</div>

						<div className="flex-1">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(handleSubmit)}
									className="w-4/5"
								>
									<div className="space-y-8">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="role"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Role</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Select role" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="m@example.com">
																m@example.com
															</SelectItem>
															<SelectItem value="m@google.com">
																m@google.com
															</SelectItem>
															<SelectItem value="m@support.com">
																m@support.com
															</SelectItem>
														</SelectContent>
													</Select>

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
					<div>
						<header className="border-b mt-[60px] text-xl font-semibold py-[16px]">
							Members
						</header>

						<div className="flex gap-15 mt-[14px]">
							<div className="w-[30%] flex flex-col gap-6 text-gray-600">
								<p>Admins can manage everything</p>
								<p>Contributors can manage some things</p>
							</div>
							<div className="flex-1">
								<MembersList />
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TeamModal;
