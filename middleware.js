import { NextResponse } from "next/server";

export async function middleware(request) {
    try {
        let token = request.cookies.get('token')
        let resp = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            }
        })

        if (!resp.ok) {
            throw new Error("Request error");
        }

        const payload = await resp.json();
        // console.log(payload)
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("user", JSON.stringify({ email: payload.email, username: payload.username }));

        resp = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        return resp;

    } catch (error) {
        console.log("error", error)
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: "/special-blogs/:path*",
};