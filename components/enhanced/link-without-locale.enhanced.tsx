"use client";
import { resolveHref } from "@/lib/href.utils";
import { cn } from "@/lib/utils";
import { useLinkStore } from "@/stores/link.store";
import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { LinkContentLoadable } from "../link-content-loadable";
import { useLocale } from "next-intl";

export const LinkWithoutLocaleEnhanced = ({
  href,
  children,
  tags = [],
  className,
  loader,
  ...props
}: ComponentProps<typeof Link> & {
  loader?: ReactNode;
  tags?: string[];
}) => {
  const loadingHref = useLinkStore((state) => state.loadingHref);
  const loadingTags = useLinkStore((state) => state.loadingTags);

  const locale = useLocale();

  const resolvedHref = resolveHref(href, locale);

  const isGlobalLoading =
    loadingHref === resolvedHref ||
    tags.some((tag) => loadingTags.includes(tag));

  return (
    <Link
      href={href}
      className={cn(className, {
        "pointer-events-none! opacity-50!": isGlobalLoading,
      })}
      {...props}
    >
      <LinkContentLoadable<typeof Link> href={href} tags={tags} loader={loader}>
        {children}
      </LinkContentLoadable>
    </Link>
  );
};
