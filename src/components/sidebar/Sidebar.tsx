"use client";

import Link from "next/link";
import {
	FileCheck,
	ListTodo,
	MessageCircleMore,
	NotebookPen,
	Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Badge } from "../ui/badge";

const menuRoutes = [
	{
		title: "Tasks",
		route: "/tasks",
		icon: <ListTodo size={18} />,
	},
	{
		title: "Docs",
		route: "/documents",
		icon: <FileCheck size={18} />,
		disabled: true,
	},
	{
		title: "Reports",
		route: "/reports",
		icon: <NotebookPen size={18} />,
		disabled: true,
	},
	{
		title: "Messages",
		route: "/messages",
		icon: <MessageCircleMore size={18} />,
		disabled: true,
	},
];
const Sidebar = () => {
	const pathname = usePathname();
	const { projectId } = useParams();

	return (
		<div className="w-[272px] h-screen bg-accent fixed top-0 flex flex-col">
			<div className="py-[24px] px-[16px]">
				<Link href="/">
					<Image
						src="/default-monochrome.svg"
						alt="logo"
						width={160}
						height={50}
					/>
				</Link>
			</div>

			<div className="flex-1 overflow-auto px-[16px]">
				<header className="text-gray-600">Menu</header>
				<ul className="mt-[10px] flex flex-col gap-2">
					{menuRoutes?.map((item, idx) => (
						<li key={idx}>
							<Link
								href={`/project/${projectId}${item.route}`}
								className={cn("flex items-center gap-2 justify-between p-2", {
									"border-l-2 border-primary font-semibold [&_svg]:text-primary shadow-sm":
										pathname.includes(item.route),
									"pointer-events-none": item.disabled,
								})}
							>
								<span className="flex items-center gap-2">
									{item.icon}
									{item.title}
								</span>
								{item.disabled && (
									<Badge className="text-[12px] py-0">Coming soon</Badge>
								)}
							</Link>
						</li>
					))}
				</ul>

				<header className="text-gray-600 mt-14">Projects</header>
				<ul className="mt-[10px] flex flex-col gap-2">
					<li>
						<Link href="/dashboard" className="flex items-center gap-2 p-2">
							<Target size={18} /> All Projects
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
