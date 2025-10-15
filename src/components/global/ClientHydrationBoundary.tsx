"use client";

import { useUser } from "@/store";
import { redirect } from "next/navigation";
import { BarLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "@/utils/api/auth";
import { queryKeys } from "@/lib/queryKeys";
import { useEffect } from "react";

const ClientHydrationBoundary = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { hasHydrated, user, setUser } = useUser();

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.user,
		queryFn: () => getAuthenticatedUser(),
		enabled: hasHydrated,
	});

	const signedUser = user ?? data?.user;

	useEffect(() => {
		if (!user && data?.user) {
			setUser(data?.user);
		}
		// eslint-disable-next-line
	}, [user, data]);

	if (!hasHydrated || (!signedUser && isLoading))
		return (
			<div className="h-screen w-screen flex items-center justify-center bg-primary/10">
				<BarLoader width={150} />
			</div>
		);

	if (signedUser && !signedUser?.email_verified_at) {
		redirect("/verify-email");
	}
	return <>{children}</>;
};

export default ClientHydrationBoundary;
