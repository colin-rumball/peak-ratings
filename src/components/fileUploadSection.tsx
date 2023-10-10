"use client";

import { useCallback } from "react";
import { trpc } from "../app/_trpc/client";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const FileUploadSection = (props: Props) => {
  const uploadFile = trpc.ratings.upload.useMutation();
  const router = useRouter();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0 || uploadFile.isLoading) return;
      const csvFile = acceptedFiles[0]!;
      const fileContents = await csvFile.text();
      const id = await uploadFile.mutateAsync(fileContents);
      router.push(`/ratings/${id}`);
    },
    [uploadFile, router],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // TODO: add link incase redirect fails
  // TODO: add uploading state
  return (
    <section {...getRootProps()} className="w-full flex-1" {...props}>
      <input {...getInputProps()} />
      <div className="mx-auto my-4 h-full w-full max-w-screen-md select-none rounded-md border border-slate-700 px-10 py-12 text-center">
        {uploadFile.isLoading || uploadFile.isSuccess ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the file here</p>
        ) : (
          <p>Drag n drop your ratings.csv here, or click to select the file</p>
        )}
      </div>
    </section>
  );
};

export default FileUploadSection;
