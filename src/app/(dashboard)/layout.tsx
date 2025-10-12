import ClientHydrationBoundary from "@/components/global/ClientHydrationBoundary";

const ProtectedLayout = async({ children }: { children: React.ReactNode }) => {
	return <ClientHydrationBoundary>{children}</ClientHydrationBoundary>;
};

export default ProtectedLayout;
