import DataDashboard from "~/components/DataDashboard";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="min-w-full">
      <DataDashboard id={id} />
    </div>
  );
};

export default Page;
