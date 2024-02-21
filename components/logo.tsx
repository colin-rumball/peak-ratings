import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import LogoImg from "@/public/images/logo.png";
import { Link } from "./ui/link";

type LogoProps = ComponentPropsWithoutRef<"div">;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex flex-col items-center justify-center opacity-100",
        className,
      )}
    >
      <div className="h-36 w-36">
        <Image src={LogoImg} alt="Logo" priority />
      </div>
      <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-serif text-[4rem] tracking-wider text-transparent">
        Peak Ratings
      </h1>
    </Link>
  );
};

export default Logo;
