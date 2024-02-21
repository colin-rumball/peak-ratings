import Page from "@/components/ui/page";
import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";
import { ImSpinner2 } from "react-icons/im";

export const LoadingIcon = () => {
  return <ImSpinner2 className="h-10 w-10 animate-spin" />;
};

export const LoadingSection = ({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"section">) => {
  return (
    <section className={cn("flex justify-center", className)} {...rest}>
      <LoadingIcon />
      {children}
    </section>
  );
};

export default function BaseLoadingPage() {
  return (
    <Page className="flex h-full items-center justify-center">
      <LoadingSection />
    </Page>
  );
}
