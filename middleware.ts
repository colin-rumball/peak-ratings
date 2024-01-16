import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware ran");
  const auth = request.headers.get("authorization");
  if (!auth) {
    // Return a 401 Unauthorized response for the api
    return Response.json(
      { success: false, message: "No auth header provided." },
      { status: 401 },
    );
  }

  const authToken = auth.replace("Bearer ", "");
  if (authToken !== "12345") {
    // Return a 403 Forbidden response for the api
    return Response.json(
      { success: false, message: "Invalid auth token provided." },
      { status: 403 },
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/",
};
