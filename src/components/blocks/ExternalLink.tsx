import { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children?: ReactNode;
}

function ExternalLink({ href, className, children }: Props) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default ExternalLink;
