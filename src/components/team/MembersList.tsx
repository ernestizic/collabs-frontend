import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllMembers } from "@/utils/api/invites";
import { queryKeys } from "@/lib/queryKeys";
import { Member } from "@/utils/types/api/project";
import { BarLoader } from "react-spinners";

const AdminList = ({ admins }: { admins: Member[] }) => {
	return (
		<div>
			{admins?.map((item, idx: number) => (
				<div
					key={idx}
					className="flex border-b py-[8px] px-2 items-center justify-between"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src="" alt="Admin" />
							<AvatarFallback>
								{item.user?.firstname?.charAt(0)}
								{item.user?.lastname?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-lg">
								{item.user?.firstname} {item.user?.lastname}
							</p>
							<p className="text-sm">{item.user?.email}</p>
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" className="h-[32px]">
							Change role
						</Button>
						<Button variant="destructive" className="bg-[#9d3030] h-[32px]">
							Remove
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

const ContributorList = ({ members }: { members: Member[] }) => {
	return (
		<div>
			{members?.map((item, idx: number) => (
				<div
					key={idx}
					className="flex border-b py-[8px] px-2 items-center justify-between"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src="" alt="Team member" />
							<AvatarFallback>
								{item.user?.firstname?.charAt(0)}
								{item.user?.lastname?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-lg">
								{item.user?.firstname} {item.user?.lastname}
							</p>
							<p className="text-sm">{item.user?.email}</p>
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" className="h-[32px]">
							Change role
						</Button>
						<Button variant="destructive" className="bg-[#9d3030] h-[32px]">
							Remove
						</Button>
					</div>
				</div>
			))}
			{!members.length && (
				<p className="px-4 pb-10">
					No member. Add a member to collaborate with.
				</p>
			)}
		</div>
	);
};
const MembersList = () => {
	const { isPending, data } = useQuery({
		queryKey: queryKeys.members,
		queryFn: getAllMembers,
	});
	const admins = data?.data.filter((m) => m.role === "ADMIN") || [];
	const members = data?.data.filter((m) => m.role === "MEMBER") || [];

	return (
		<div className="w-full">
			<Tabs defaultValue="admins" className="w-full border">
				<TabsList className="border-b w-full rounded-none bg-white h-[40px]">
					<TabsTrigger value="admins">Admins</TabsTrigger>
					<TabsTrigger value="contributors">Contributors</TabsTrigger>
				</TabsList>

				{isPending ? (
					<div className="flex justify-center items-center w-full h-8">
						<BarLoader
							width={150}
							color="var(--primary)"
							className="bg-accent"
						/>
					</div>
				) : (
					<>
						<TabsContent value="admins">
							<AdminList admins={admins} />
						</TabsContent>
						<TabsContent value="contributors">
							<ContributorList members={members} />
						</TabsContent>
					</>
				)}
			</Tabs>
		</div>
	);
};

export default MembersList;
