"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventLabel: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function TrackedLink({
  eventName,
  eventLabel,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick: NonNullable<TrackedLinkProps["onClick"]> = (event) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        link_text: eventLabel,
      });
    }

    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
