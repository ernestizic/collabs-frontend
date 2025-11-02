"use client";

import Searchbar from "@/components/globalSearch/Searchbar";
import Notification from "@/components/notification/Notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/utils/api/auth";
import { useUser } from "@/store";
import { LogOut, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const ProjectDashboardLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useUser();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="h-[72px] fixed z-10 top-0 w-screen bg-white border-b flex items-center justify-between px-[24px]">
				<div className="flex items-center gap-20">
				<Link href="/" className="relative block w-[160px] h-[50px]">
					<Image
						src="/default-monochrome.svg"
						alt="logo"
						fill
						style={{ objectFit: "contain" }}
						priority
					/>
				</Link>

					<Searchbar />
				</div>
				<div className="flex items-center gap-4">
					<Notification />

					<Popover>
						<PopoverTrigger asChild>
							<button className="px-[12px] rounded-lg flex items-center gap-4">
								<Avatar className="size-10">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>

								<div className="w-full truncate text-left">
									<p className="truncate text-lg font-semibold">
										{user?.firstname} {user?.lastname}
									</p>
									<p className="truncate text-sm">{user?.email}</p>
								</div>
							</button>
						</PopoverTrigger>
						<PopoverContent className="border-2 py-4 px-[6px]">
							<header className="mb-4 text-sm text-gray-800">
								Profile menu
							</header>
							<Separator className="my-1" />
							<div className="flex flex-col gap-2">
								<Link
									href="/dashboard/settings"
									className="h-[40px] [&_svg]:shrink-0 px-2 flex items-center hover:bg-accent rounded-md gap-2"
								>
									<Settings size={18} /> Settings
								</Link>
								<Button
									variant="ghost"
									className="h-[40px] justify-start"
									onClick={handleLogout}
								>
									<LogOut /> Logout
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className="mt-[72px] min-h-[calc(100vh-72px)] bg-primary/5">
				{children}
			</div>
		</div>
	);
};

export default ProjectDashboardLayout;
