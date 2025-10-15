import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const payload = await req.json();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
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
		console.log("login api server error", error);
		return new NextResponse("Internal server error", {
			status: 500,
		});
	}
}
