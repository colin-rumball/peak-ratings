import InternalConvexProvider from "./convex-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <InternalConvexProvider>{children}</InternalConvexProvider>;
};

export default Providers;
