"use client";
import { trpc } from "~/app/_trpc/client";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const getRatings = trpc.ratings.get.useQuery(id);

  return (
    <div>
      {id}
      <ul>
        {getRatings.isSuccess &&
          getRatings.data?.map((record) => (
            <li key={record.Const}>{record.Title}</li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
