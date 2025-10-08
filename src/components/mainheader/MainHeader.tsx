"use client"

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

const MainHeader = () => {

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
				<button className="px-[12px] rounded-lg flex items-center gap-4">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="w-full truncate text-left">
						<p className="truncate text-lg font-semibold">
							Ifeanyichukwu Isaac
						</p>
						<p className="truncate text-sm">ieifeanyichukwu@gmail.com</p>
					</div>
				</button>
			</div>
		</div>
	);
};

export default MainHeader;
