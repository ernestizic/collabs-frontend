import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const AdminList = () => {
	return (
		<div>
			{Array.from({ length: 1 }).map((item, idx) => (
				<div
					key={idx}
					className="flex border-b py-[8px] px-2 items-center justify-between"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-lg">John Doe</p>
							<p className="text-sm">johndoe@yopmail.com</p>
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" className="h-[32px]">
							Change role
						</Button>
						<Button variant="destructive" className="bg-[#9d3030] h-[32px]">
							Delete
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

const ContributorList = () => {
	return (
		<div>
			{Array.from({ length: 0 }).map((item, idx) => (
				<div
					key={idx}
					className="flex border-b py-[8px] px-2 items-center justify-between"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-lg">John Doe</p>
							<p className="text-sm">johndoe@yopmail.com</p>
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" className="h-[32px]">
							Change role
						</Button>
						<Button variant="destructive" className="bg-[#9d3030] h-[32px]">
							Delete
						</Button>
					</div>
				</div>
			))}
      <p className="px-4 pb-10">No member. Add a member to collaborate with.</p>
		</div>
	);
};
const MembersList = () => {
	return (
		<div className="w-full">
			<Tabs defaultValue="admins" className="w-full border">
				<TabsList className="border-b w-full rounded-none bg-white h-[40px]">
					<TabsTrigger value="admins">Admins</TabsTrigger>
					<TabsTrigger value="contributors">Contributors</TabsTrigger>
				</TabsList>
				<TabsContent value="admins">
					<AdminList />
				</TabsContent>
				<TabsContent value="contributors">
					<ContributorList />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MembersList;
