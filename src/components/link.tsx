import React from "react";
import NextLink from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: "_self" | "_blank";
  title: string;
}

const Link: React.FC<Props> = ({
  href,
  children,
  className,
  target,
  title,
}) => {
  const isExternal = href.startsWith("http") || href.startsWith("://") || href.startsWith("/resume.pdf");

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel="noopener noreferrer"
        className={`underline decoration-neutral-300 underline-offset-4 transition-colors dark:decoration-neutral-600 focus:(decoration-neutral-400 outline-offset-6 dark:decoration-neutral-500) hover:(decoration-neutral-400 dark:decoration-neutral-500) ${className}`}
        title={title}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      target={target}
      className={`underline decoration-neutral-300 underline-offset-4 transition-colors dark:decoration-neutral-600 focus:(decoration-neutral-400 outline-offset-6 dark:decoration-neutral-500) hover:(decoration-neutral-400 dark:decoration-neutral-500) ${className}`}
      title={title}
    >
      {children}
    </NextLink>
  );
};

export default Link;
