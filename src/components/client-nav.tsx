"use client";
import * as React from "react";

export function ClientNav({ href, children, ...props }: React.PropsWithChildren<{ href: string } & React.HTMLAttributes<HTMLAnchorElement>>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
