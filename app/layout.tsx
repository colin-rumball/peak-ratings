import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Ratings Monster",
  description: "IMDB user ratings analysis",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen w-screen bg-slate-800 text-slate-200`}
      >
        <header className="mb-20 h-20 w-screen bg-emerald-600">
          <div className="container m-auto flex h-full">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Site Logo"
                className="h-full w-auto object-contain p-2"
              />
            </Link>
          </div>
        </header>
        {children}
        <footer className="mt-20 h-28 w-screen bg-slate-900 text-slate-600">
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-2xl">
              Made with ❤️ by{" "}
              <a href="https://colinrumball.com">Colin Rumball</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

export default RootLayout;
