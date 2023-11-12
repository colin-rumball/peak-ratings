import Link from "next/link";
import FileUploadSection from "@/components/fileUploadSection";
import Image from "next/image";
import logoPNG from "@/public/images/logo.png";

export default function UploadPage() {
  return (
    <main>
      <div className="flex flex-col items-center py-8">
        <Image src={logoPNG} alt="site logo" priority />
        <h1 className="p-2 text-center text-3xl">Analyze Your IMDB Ratings</h1>
        <p className="text-center">
          Grab your data from your IMDB account and drop it into the box below.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <FileUploadSection />
      </div>
      <div className="flex flex-col items-center justify-center py-6">
        <p>Not sure where to get your data from? </p>
        <Link
          className="m-2 rounded-xl bg-slate-300 px-4 py-2 text-xl text-slate-800 hover:bg-slate-400"
          href={"/how-to"}
        >
          Click here to find out!
        </Link>
      </div>
    </main>
  );
}
