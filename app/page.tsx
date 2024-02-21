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

export default function HomePage() {
  return (
    <Page>
      <div className="mt-48 flex w-full flex-grow flex-col items-center gap-16">
        <section className="flex w-[750px] flex-col items-center justify-center gap-4 rounded-lg border bg-background/80 p-8">
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
            <Link href={"/ratings/j578pg9qdwqvg4w089hdyzdq7d6kwj5c"}>here</Link>
          </p>
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-background/80 p-4">
          <Accordion type="single" collapsible className="w-[375px]">
            <AccordionItem value="item-1" className="">
              <AccordionTrigger className="flex gap-4">
                Where is my IMDB ratings data?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p>
                  You can export your ratings to a .csv file anytime by logging
                  into your IMDb account, heading to your ratings page found
                  under your profile in the upper right of the webpage and
                  selecting the three dots drop down menu.
                </p>
                <Image
                  src={ImdbImg}
                  alt="screen shot of the export button on IMDB"
                  className="w-full"
                />
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
