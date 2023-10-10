import "~/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type AppType } from "next/app";
import Provider from "./_trpc/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Ratings Monster",
  description: "IMDB user ratings analysis",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} container flex min-h-screen flex-col bg-slate-800 p-4 text-slate-100`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
