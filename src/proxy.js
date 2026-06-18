import { NextResponse } from "next/server";
import { getUserSession } from "./lib/core/session";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await getUserSession();
  //   console.log(session);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/all-classes/:path",
};
