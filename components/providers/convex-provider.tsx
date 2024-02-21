"use client";

import {
  ConvexProvider as InternalConvexProvider,
  ConvexReactClient,
} from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type ProvidersProps = {
  children: React.ReactNode;
};

const ConvexProvider = ({ children }: ProvidersProps) => {
  return (
    <InternalConvexProvider client={convex}>{children}</InternalConvexProvider>
  );
};

export default ConvexProvider;
