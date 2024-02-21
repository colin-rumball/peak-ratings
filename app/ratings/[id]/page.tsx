import DataDashboard from "@/components/DataDashboard";
import Logo from "@/components/logo";
import Page from "@/components/ui/page";
import { api } from "@/convex/_generated/api";
import { type Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

export default async function RatingsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const ratingsFileUrl = await fetchQuery(api.ratings.getRatingsFileURL, {
    id: id as Id<"ratings">,
  });

  if (!ratingsFileUrl) {
    throw new Error("Ratings file not found");
  }

  return (
    <Page>
      <div className="mt-12 flex items-center justify-center">
        <Logo />
      </div>
      <DataDashboard ratingsFileUrl={ratingsFileUrl} />
    </Page>
  );
}
