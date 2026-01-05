"use client";

import { resolveHref } from "@/lib/href.utils";
import { cn } from "@/lib/utils";
import { useLinkStore } from "@/stores/link.store";
import { type ComponentProps, type ReactNode } from "react";
import { ExternalLinkContentLoadable } from "../external-link-content-loadable";

export const LinkExternalEnhanced = ({
  href,
  children,
  tags = [],
  className,
  loader,
  ...props
}: ComponentProps<"a"> & {
  loader?: ReactNode;
  tags?: string[];
}) => {
  const setLoadingLink = useLinkStore((state) => state.setLoadingLink);

  const loadingHref = useLinkStore((state) => state.loadingHref);
  const loadingTags = useLinkStore((state) => state.loadingTags);

  const safeHref = href ?? "";
  const resolvedHref = resolveHref(safeHref);

  const isGlobalLoading =
    loadingHref === resolvedHref ||
    tags.some((tag) => loadingTags.includes(tag));

  return (
    <a
      href={safeHref}
      className={cn(className, {
        "pointer-events-none opacity-50": isGlobalLoading,
      })}
      onClick={() => {
        setLoadingLink({
          href: resolvedHref,
          tags: tags,
        });
      }}
      {...props}
    >
      <ExternalLinkContentLoadable
        href={safeHref}
        loader={loader}
        isLoading={isGlobalLoading}
      >
        {children}
      </ExternalLinkContentLoadable>
    </a>
  );
};
