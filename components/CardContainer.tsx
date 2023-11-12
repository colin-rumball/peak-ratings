import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "./ui/card";

interface Props extends React.ComponentPropsWithRef<"div"> {
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
}

const CardContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> | Props
>(({ children, className, title, subTitle, footer }: Props, ref) => {
  CardContainer.displayName = "CardContainer";
  return (
    <Card ref={ref} className={cn(className, "h-full")}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {subTitle && (
          <CardDescription className="px-0">{subTitle}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="h-full">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
});

export default CardContainer;
