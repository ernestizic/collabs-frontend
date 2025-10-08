import KanbanBoard from "./KanbanBoard";
import CreateColumn from "./CreateColumn";

const KanbanView = () => {
	return (
		<>
			<div className="h-full flex gap-2 overflow-auto">
				{Array.from({ length: 4 }).map((item, idx) => (
					<KanbanBoard key={idx} />
				))}
				<CreateColumn />
			</div>
		</>
	);
};

export default KanbanView;
