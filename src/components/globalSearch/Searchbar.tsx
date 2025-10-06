import { SearchIcon } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import { cn } from "@/lib/utils";

interface SearchbarProps {
	className?: string;
}
const Searchbar = ({ className }: SearchbarProps) => {
	return (
		<InputGroup
			className={cn(
				"w-[350px] border-[#e8e2e2] has-[[data-slot=input-group-control]:focus-visible]:border-ring",
				className
			)}
		>
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon>
				<SearchIcon />
			</InputGroupAddon>
		</InputGroup>
	);
};

export default Searchbar;
