import { redirect } from "next/navigation";
import { BarLoader } from "react-spinners";
import { cookies } from "next/headers";

interface AcceptUserPageProps {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}
const AcceptUserPage = async ({ searchParams }: AcceptUserPageProps) => {
	const param = await searchParams;
	const code = param.code;
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const cookie = await cookies();
	const token = cookie.get("access_token")?.value;

	if (!code) redirect("/");

  let data;

	try {
		const res = await fetch(`${baseUrl}projects/accept-invite?code=${code}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		data = await res.json();
	} catch (e) {
		console.log("Error accepting invite", e);
		redirect(`/`);
	}

	if (data?.status === true) {
		const projectId = data.data.projectId;
		redirect(`/project/${projectId}/tasks`);
	} else {
		redirect("/");
	}

	return (
		<div className="h-screen w-screen flex flex-col gap-2 items-center justify-center bg-primary/10">
			<BarLoader width={150} color="var(--primary)" className="bg-accent" />
			Please wait...
		</div>
	);
};

export default AcceptUserPage;
