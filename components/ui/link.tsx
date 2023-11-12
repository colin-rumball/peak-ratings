import NextLink, { LinkProps } from "next/link";
import { BsArrowRightShort } from "react-icons/bs";

interface Props extends LinkProps {
  children: React.ReactNode;
  externalLink?: boolean;
}

const Link = ({ children, externalLink, ...props }: Props) => {
  return (
    <NextLink
      target={externalLink ? "_blank" : ""}
      className="group flex items-center justify-center font-semibold leading-tight"
      {...props}
    >
      <span className="border-b-2 border-transparent px-2 pb-1 transition-all group-hover:border-b-ff-dark-pink">
        {children}
      </span>
      <span className="pb-1 text-2xl transition-all duration-300 group-hover:translate-x-2">
        <BsArrowRightShort />
      </span>
    </NextLink>
  );
};

export default Link;
