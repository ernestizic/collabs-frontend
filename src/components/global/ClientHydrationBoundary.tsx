"use client";

import { useUser } from "@/store";
import { redirect } from "next/navigation";
import { BarLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "@/utils/api/auth";
import { queryKeys } from "@/lib/queryKeys";

const ClientHydrationBoundary = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { hasHydrated, user } = useUser();

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.user,
		queryFn: () => getAuthenticatedUser(),
		enabled: hasHydrated,
	});

	if (!hasHydrated || (!user && isLoading))
		return (
			<div className="h-screen w-screen flex items-center justify-center bg-primary/10">
				<BarLoader width={150} />
			</div>
		);

	if (
		(user || data?.user) &&
		!(user?.email_verified_at || data?.user?.email_verified_at)
	)
		redirect("/verify-email");
	return <>{children}</>;
};

export default ClientHydrationBoundary;
