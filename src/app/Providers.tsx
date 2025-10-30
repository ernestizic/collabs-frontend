"use client";

import GlobalModal from "@/components/global/modals/GlobalModal";
import { ModalContextProvider } from "@/context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ModalContextProvider>
				{children}
				<GlobalModal />
			</ModalContextProvider>
		</QueryClientProvider>
	);
};

export default Providers;
