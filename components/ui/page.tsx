import { cn } from "@/lib/utils";
import { type ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"main">;

const Page = forwardRef<HTMLDivElement, Props>(
  ({ className, style, children }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "flex h-full w-full flex-grow flex-col bg-gradient-to-b from-background/10 to-accent/20",
          className,
        )}
        style={style}
      >
        {children}
      </main>
    );
  },
);

Page.displayName = "Page";

export default Page;
