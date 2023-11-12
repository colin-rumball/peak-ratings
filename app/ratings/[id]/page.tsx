import DataDashboard from "@/components/DataDashboard";
import useRatingsData from "@/lib/hooks/useRatingsData";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const ratingsData = await useRatingsData(id);

  return (
    <div className="min-w-full">
      <DataDashboard id={id} ratingsData={ratingsData} />
    </div>
  );
};

export default Page;
