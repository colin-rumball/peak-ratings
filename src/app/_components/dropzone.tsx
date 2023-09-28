"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onDrop: (acceptedFiles: File[]) => void;
}

const Dropzone = ({ onDrop }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="mx-auto my-4 rounded-md border border-slate-700 px-10 py-12 text-center">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
