import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	const token = request.cookies.get("jwt")?.value;

	const pathname = request.nextUrl.pathname;

	const isAuthPage = pathname.startsWith("/auth");

	const isProtected = pathname.startsWith("/dashboard");

	if (!token) {
		if (isProtected) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}

		return NextResponse.next();
	}

	if (isAuthPage) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
