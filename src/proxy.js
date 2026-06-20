import { NextResponse } from "next/server";
import { getUserSession } from "./lib/core/session";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await getUserSession();
  //   console.log(session);
  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/all-classes/:path", "/forum/:path"],
};
