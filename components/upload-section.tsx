"use client";

import { type ComponentPropsWithoutRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Input } from "./ui/input";
import { type Id } from "@/convex/_generated/dataModel";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";

type UploadSectionProps = ComponentPropsWithoutRef<"div">;

const UploadSection = ({ className }: UploadSectionProps) => {
  const router = useRouter();
  const generateUploadUrl = useMutation(api.ratings.generateUploadUrl);
  const sendRatings = useMutation(api.ratings.sendRatingsFile);

  const ratingsFileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleSendFile(file: File) {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const resJson = (await result.json()) as { storageId: Id<"_storage"> };
    const id = await sendRatings({ storageId: resJson.storageId });
    router.push(`/ratings/${id}`);
  }

  return (
    <section
      className="flex h-[175px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center"
      role="presentation"
      tabIndex={0}
      data-state="ready"
      onClick={() => ratingsFileInput.current?.click()}
    >
      {uploading && (
        <div className="flex flex-col items-center justify-center gap-4">
          <ImSpinner2 className="h-10 w-10 animate-spin" />
        </div>
      )}
      {!uploading && (
        <>
          <IoCloudUploadOutline className="h-8 w-8" />
          <label
            htmlFor="file-upload"
            className="relative mt-4 flex w-64 cursor-pointer select-none items-center justify-center text-sm font-semibold leading-6 text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            data-ut-element="label"
            data-state="ready"
          >
            Choose files or drag and drop
            <Input
              ref={ratingsFileInput}
              className="sr-only"
              accept=".csv"
              multiple={false}
              tabIndex={-1}
              type="file"
              disabled={uploading}
              style={{ display: "none" }}
              onChange={async (event) => {
                if (
                  event.target.files &&
                  event.target.files.length > 0 &&
                  event.target.files[0]
                ) {
                  setUploading(true);
                  await handleSendFile(event.target.files[0]);
                }
              }}
            />
          </label>
          <div
            className="m-0 h-[1.25rem] text-xs leading-5 text-gray-500"
            data-ut-element="allowed-content"
            data-state="ready"
          >
            CSV (4MB)
          </div>
        </>
      )}
    </section>
  );
};

export default UploadSection;
