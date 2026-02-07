"use client";

import CreateColumn from "@/app/(dashboard)/(main)/project/[projectId]/tasks/_components/views/kanban/CreateColumn";
import DeleteColumnPrompt from "@/app/(dashboard)/(main)/project/[projectId]/tasks/_components/views/kanban/DeleteColumnPrompt";
import EditColumnModal from "@/app/(dashboard)/(main)/project/[projectId]/tasks/_components/views/kanban/EditColumnModal";
import SetLimitModal from "@/app/(dashboard)/(main)/project/[projectId]/tasks/_components/views/kanban/SetLimitModal";
import { useModalContext } from "@/context/ModalContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
	createBoardModal: CreateColumn,
	deleteColumnPrompt: DeleteColumnPrompt,
	setLimitModal: SetLimitModal,
	updateColumnModal: EditColumnModal,
};

const GlobalModal = () => {
	const { modalId, modalProps, closeModal } = useModalContext();

	if (!modalId) return null;

	const ModalComponent = MODAL_COMPONENTS[modalId];
	return <ModalComponent {...modalProps} onClose={closeModal} />;
};

export default GlobalModal;
