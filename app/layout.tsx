import "@/app/globals.css";

import { Inter, Six_Caps } from "next/font/google";
import Providers from "@/components/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sixCaps = Six_Caps({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata = {
  title: "Peak Ratings",
  description: "User ratings analysis",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${sixCaps.variable} flex min-h-screen w-screen flex-col overflow-x-hidden bg-[url(/images/grain.png)]`}
      >
        <Providers>{children}</Providers>
        <footer className="h-28 w-screen bg-accent/20">
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
