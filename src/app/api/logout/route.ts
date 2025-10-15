import { NextResponse } from "next/server";

export async function POST() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/logout`,
			{
				method: "POST",
        credentials: 'include',
			}
		);

		const data = await res.json();
		const rawSetCookie = res.headers.get("set-cookie");

		const response = NextResponse.json(data, {
			status: res.status,
			headers: rawSetCookie
				? {
						"Set-Cookie": rawSetCookie,
				  }
				: {},
		});

		return response;
	} catch (error) {
		console.log("logout api server error", error);
		return new NextResponse("Internal server error", {
			status: 500,
		});
	}
}
