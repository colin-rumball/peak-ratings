"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { uploadRatings } from "@/app/actions";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const FileUploadSection = (props: Props) => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0 || uploading) return;
      setUploading(true);
      const csvFile = acceptedFiles[0]!;
      const fileContents = await csvFile.text();
      const id = await uploadRatings(fileContents);
      router.push(`/ratings/${id}`);
    },
    [uploading, router],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // TODO: add link incase redirect fails
  // TODO: add uploading state
  return (
    <section {...getRootProps()} className="w-full flex-1" {...props}>
      <input {...getInputProps()} />
      <div className="mx-auto my-4 h-full w-full max-w-screen-md select-none rounded-md border border-slate-700 px-10 py-12 text-center">
        {uploading ? (
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
