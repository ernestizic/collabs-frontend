"use client";

import { useUser } from "@/store";
import { redirect } from "next/navigation";
import { BarLoader } from "react-spinners";

const ClientHydrationBoundary = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { hasHydrated, user } = useUser();

	if (!hasHydrated)
		return (
			<div className="h-screen w-screen flex items-center justify-center bg-primary/10">
				<BarLoader width={150} />
			</div>
		);

	if (!user?.email_verified_at) redirect("/verify-email");
	return <>{children}</>;
};

export default ClientHydrationBoundary;
