"use client";
import { Link } from "@/i18n/navigation";
import { resolveHref } from "@/lib/href.utils";
import { cn } from "@/lib/utils";
import { useLinkStore } from "@/stores/link.store";
import { useLinkStatus } from "next/link";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { Spinner } from "../ui/spinner";

export const LinkEnhanced = ({
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

  const resolvedHref = resolveHref(href);

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
      <LinkContentLoadable href={href} tags={tags} loader={loader}>
        {children}
      </LinkContentLoadable>
    </Link>
  );
};

const LinkContentLoadable = ({
  href,
  tags = [],
  loader = (
    <>
      <Spinner /> Loading...
    </>
  ),
  children,
}: {
  href: ComponentProps<typeof Link>["href"];
  tags?: string[];
  loader?: ReactNode;
  children?: ReactNode;
}) => {
  const { pending } = useLinkStatus();
  const setLoadingLink = useLinkStore((state) => state.setLoadingLink);
  const clearLoadingLink = useLinkStore((state) => state.clearLoadingLink);
  const resolvedHref = resolveHref(href);

  const tagsRef = useRef(tags);

  const isTagsChanged = tagsRef.current.join(",") !== tags.join(",");

  if (isTagsChanged) {
    tagsRef.current = tags;
  }

  const stableTags = tagsRef.current;

  useEffect(() => {
    if (pending) {
      setLoadingLink({
        href: resolvedHref,
        tags: stableTags,
      });
    } else {
      clearLoadingLink({ href: resolvedHref });
    }

    return () => {
      clearLoadingLink({ href: resolvedHref });
    };
  }, [pending, setLoadingLink, clearLoadingLink, resolvedHref, stableTags]);

  return (
    <>
      {pending && loader}
      {!pending && children}
    </>
  );
};
