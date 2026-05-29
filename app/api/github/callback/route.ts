import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("GitHub callback hit");

    const code = req.nextUrl.searchParams.get("code");

    console.log("Authorization Code:", code);

    if (!code) {
        return NextResponse.redirect(
            new URL("/workspace?error=missing_code", req.url)
        );
    }

    const res = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            }),
        }
    );

    const data = await res.json();

    console.log("Token Exchange Response:", data);

    const token = data.access_token;

    console.log("Access Token:", token);

    if (!token) {
        console.log("Token exchange failed");

        return NextResponse.redirect(
            new URL("/workspace?error=token_exchange_failed", req.url)
        );
    }

    const response = NextResponse.redirect(
        new URL("/workspace", req.url)
    );

    response.cookies.set("gh_token", token, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    console.log("Cookie gh_token set successfully");

    return response;
}