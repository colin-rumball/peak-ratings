"use client";

import { useCallback } from "react";
import Dropzone from "~/app/_components/dropzone";
import { trpc } from "../_trpc/client";
import { parseCSV as parseCSVToJson } from "~/utils/csv-parser";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const FileUploadSection = (props: Props) => {
  const uploadFile = trpc.ratings.upload.useMutation();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const csvFile = acceptedFiles[0]!;
      const fileContents = await csvFile.text();
      const ratings = await parseCSVToJson(fileContents);
      const res = await uploadFile.mutateAsync(ratings);
    },
    [uploadFile],
  );
  return (
    <section {...props}>
      <div className="min-h-screen max-w-xl">
        <Dropzone onDrop={onDrop} />
      </div>
    </section>
  );
};

export default FileUploadSection;
