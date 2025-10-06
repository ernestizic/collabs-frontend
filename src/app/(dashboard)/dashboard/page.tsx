"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
	const router = useRouter();
	return (
		<div className="max-w-[1024px] 2xl:max-w-[1500] mx-auto">
			<div className="border-b pt-14 pb-1 mb-20">
				<Button
					className="flex ml-auto"
					onClick={() => router.push("/create-project")}
				>
					<Plus /> Create new project
				</Button>
			</div>
			<div className="clear-both grid grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-7">
				{Array.from({ length: 5 }).map((item, idx) => (
					<div
						role="link"
						tabIndex={0}
						aria-label="Open project"
						onClick={() => router.push("/project")}
						key={idx}
						className="bg-white shadow rounded-2xl p-[24px] h-[200px] flex flex-col justify-between cursor-pointer"
					>
						<div>
							<div className="flex items-center gap-2">
								<Avatar className="size-12 rounded">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-lg font-semibold line-clamp-2">
										Project name
									</p>
									<p className="text-sm">4 tasks</p>
								</div>
							</div>
							<p className="text-[14px] mt-4 line-clamp-2">
								This is a short description
							</p>
						</div>

						<p>2 years ago</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default DashboardPage;
