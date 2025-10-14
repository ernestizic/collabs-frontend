"use client";

import GlobalModal from "@/components/global/modals/GlobalModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalModal />
			{children}
		</QueryClientProvider>
	);
};

export default Providers;
