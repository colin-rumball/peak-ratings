"use client";

import { useCallback, useState } from "react";
import Dropzone from "~/app/_components/dropzone";
import { trpc } from "../_trpc/client";
import Link from "next/link";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const FileUploadSection = (props: Props) => {
  const [pageID, setPageID] = useState<string>();
  const uploadFile = trpc.ratings.upload.useMutation();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const csvFile = acceptedFiles[0]!;
      const fileContents = await csvFile.text();
      const res = await uploadFile.mutateAsync(fileContents);
      setPageID(res);
    },
    [uploadFile],
  );
  return (
    <section {...props}>
      <div className="">
        <Dropzone onDrop={onDrop} />
      </div>
      <div className="my-3">
        {pageID !== undefined && (
          <Link href={`/ratings/${pageID}`}>View your ratings</Link>
        )}
      </div>
    </section>
  );
};

export default FileUploadSection;
