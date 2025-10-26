"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
// import Searchbar from "../globalSearch/Searchbar";
import Notification from "../notification/Notification";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { logout } from "@/utils/api/auth";
import { useUser } from "@/store";
import { Separator } from "../ui/separator";
import { LogOut, Settings } from "lucide-react";

const MainHeader = () => {
	const { user } = useUser();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="h-[72px] fixed z-10 top-0 w-[calc(100%-272px)] bg-white border-b flex items-center justify-between px-[24px]">
			<div className="flex items-center">
				{/* <Searchbar /> */}

				<Select>
					<SelectTrigger className="min-w-[180px] justify-start border-none shadow-none [&_svg:not([class*='text-'])]:text-[#000] [&_svg:not([class*='text-'])]:size-[18px]">
						<div className="bg-primary/20 size-[30px] flex items-center justify-center rounded">
							C
						</div>
						<SelectValue placeholder="Collabs product project" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Collabs product project</SelectItem>
						<SelectItem value="dark">Collabs Marketing</SelectItem>
						<SelectItem value="system">Sembly App production</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center gap-10">
				<Notification />

				<Popover>
					<PopoverTrigger asChild>
						<button className="px-[12px] rounded-lg flex items-center gap-4">
							<Avatar>
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
						<header className="mb-4 text-sm text-gray-800">Profile menu</header>
						<Separator className="my-1" />
						<div className="flex flex-col gap-2">
							<Link
								href="/dashboard/settings"
								className="h-[40px] [&_svg]:shrink-0 px-2 flex items-center hover:bg-accent rounded-md gap-2 pointer-events-none"
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
	);
};

export default MainHeader;
