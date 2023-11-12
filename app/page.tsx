"use client";

import Lottie from "lottie-react";
import GraphsAnim from "@/public/lottie/graphs.json";
import AnalyzeAnim from "@/public/lottie/analyze.json";
import Pie from "@/public/lottie/pie.json";
import Link from "@/components/ui/link";
import NextLink from "next/link";
import { BsCheckSquare } from "react-icons/bs";
import Image from "next/image";
import Monster from "@/public/images/monster.png";
import Lightbulb from "@/public/images/lightbulb.png";
import Magnifying from "@/public/images/magnifying.png";
import Filmreel from "@/public/images/filmreel.png";

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="mb-8 flex flex-col justify-center">
        <div className="mb-10 grid grid-cols-2 gap-8">
          <h2 className="col-span-1 text-6xl">
            Uncover Trends in Your Ratings with our Data Analysis{" "}
            <span className="text-orange-500">Monster</span>
          </h2>
          <div className="col-span-1">
            <p className="mb-10 text-lg leading-5">
              Welcome to MyRatings.Monster, the website where you can analyze
              your IMDb ratings and discover trends among the movies and TV
              shows you&apos;ve watched. Our data analysis monster mascot is
              here to help you make sense of your ratings and find valuable
              insights.
            </p>
            <div className="">
              <NextLink
                href={"/upload"}
                className="rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 text-xl font-bold text-white hover:from-green-500 hover:to-blue-600"
              >
                Get Started
              </NextLink>
            </div>
          </div>
        </div>
        <div className="relative flex h-[600px] items-center justify-center">
          <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-white" />
          <div className="pointer-events-none -mb-96 -mt-80 flex select-none items-center justify-center">
            <Lottie animationData={GraphsAnim} className="h-full" />
          </div>
          <Image
            priority
            src={Monster}
            alt="monster"
            className="absolute bottom-2 left-0 lg:left-10"
            height={300}
          />
        </div>
      </section>
      <section className="mb-8 grid grid-cols-4 gap-8">
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="mb-8 text-5xl">
            Import and Analyze Your IMDb Ratings with Ease
          </h3>
          <p className="mb-6">
            Discover trends and insights by importing your IMDb ratings to our
            data analysis platform.
          </p>
          <ul className="flex flex-col gap-6">
            <li className="flex items-center gap-4">
              <BsCheckSquare className="text-xl" />
              <p>
                Gain valuable knowledge about your watching patterns to enhance
                your entertainment experience.
              </p>
            </li>
            <li className="flex items-center gap-4">
              <BsCheckSquare className="text-xl" />
              <p>
                Get a clear picture of your movie and TV show preferences
                through interactive charts and graphs.
              </p>
            </li>
            <li className="flex items-center gap-4">
              <BsCheckSquare className="text-xl" />
              <p>
                Share your results with friends and family to compare your IMDb
                ratings.
              </p>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <Lottie animationData={AnalyzeAnim} />
        </div>
      </section>
      <section className="mb-8">
        <div className="flex flex-col items-center justify-center">
          <h4 className="mb-10 text-4xl">
            Discover even more insights with our premium AI driven features
          </h4>
          <ul className="flex justify-between gap-10">
            <li className="flex flex-1 flex-col items-center">
              <Image
                src={Lightbulb}
                alt=""
                className="m-1 w-1/2 rounded-full p-2"
              />
              <h5 className="mb-4  text-center text-xl font-bold">
                Recommendation Engine
              </h5>
              <p className="mb-4 text-center">
                Get tailored suggestions of what to watch next based on your
                IMDb history.
              </p>
              <Link href={"/#"}>Explore</Link>
            </li>
            <li className="flex flex-1 flex-col items-center">
              <Image
                src={Magnifying}
                alt=""
                className="m-1 w-1/2 rounded-full p-2"
              />
              <h5 className="mb-4  text-center text-xl font-bold">
                Personalized Insights
              </h5>
              <p className="mb-4 text-center">
                Receive in-depth analyses pertaining to your specific viewing
                patterns.
              </p>
              <Link href={"/#"}>Discover</Link>
            </li>
            <li className="flex flex-1 flex-col items-center">
              <Image
                src={Filmreel}
                alt=""
                className="m-1 w-1/2 rounded-full p-2"
              />
              <h5 className="mb-4  text-center text-xl font-bold">
                Plot and Character Analysis
              </h5>
              <p className="mb-4 text-center">
                Dive into the nuances of the plot and receive in-depth analyses
                about the media you love.
              </p>
              <Link href={"/upload"}>Get Started</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
