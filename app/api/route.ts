import { type NextRequest, type NextResponse } from "next/server";
import { MovieDb } from "moviedb-promise";

const movieDB = new MovieDb("6428706c6df59e9c687fa1c5686f6363");

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query) return Response.json({ message: "No query provided" });
  const results = await movieDB.searchMovie({ query });
  return Response.json({ results });
}
