import Logo from "@/components/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/components/ui/link";
import Page from "@/components/ui/page";
import UploadSection from "@/components/upload-section";
import Image from "next/image";
import ImdbImg from "@/public/images/imdb-menu.png";
import { env } from "@/env";

export default function HomePage() {
  return (
    <Page>
      <div className="mt-24 flex w-full flex-grow flex-col items-center gap-16 px-6 md:mt-48 md:p-0">
        <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border bg-background/80 p-8 md:w-[750px]">
          <Logo />
          <p>
            Grab your ratings info from your IMDB account and drop it into the
            box below.
          </p>
          <div className="w-full flex-grow rounded-lg border border-dashed border-primary/60">
            <UploadSection />
          </div>
          <p>
            or view a sample dashboard{" "}
            <Link href={env.NEXT_PUBLIC_SAMPLE_URL}>here</Link>
          </p>
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-background/80 p-4">
          <Accordion
            type="single"
            collapsible
            className="w-[300px] md:w-[375px]"
          >
            <AccordionItem value="item-1" className="">
              <AccordionTrigger className="flex gap-4">
                Where is my IMDB ratings data?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p>
                  You can export your ratings to a .csv file anytime by logging
                  into your IMDb account, heading to your ratings page found
                  under your profile in the upper right of the webpage, and
                  selecting the three dots drop down menu.
                </p>
                <div className="flex w-full justify-center">
                  <Image
                    src={ImdbImg}
                    alt="screen shot of the export button on IMDB"
                    className=""
                  />
                </div>
                <p>
                  Then select export and it will create a .csv file that you can
                  save to your device and upload here.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </Page>
  );
}
