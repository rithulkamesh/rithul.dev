import React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: "_self" | "_blank";
}

const Link: React.FC<Props> = ({ href, children, className, target }) => {
  const isExternal = href.startsWith("http") || href.startsWith("://");

  return (
    <a
      href={href}
      target={target || isExternal ? "_blank" : "_self"}
      className={`underline decoration-neutral-300 underline-offset-4 transition-colors dark:decoration-neutral-600 focus:(decoration-neutral-400 outline-offset-6 dark:decoration-neutral-500) hover:(decoration-neutral-400 dark:decoration-neutral-500) ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
