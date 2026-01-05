"use client";

import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import { Spinner } from "./ui/spinner";
import Link, { useLinkStatus } from "next/link";
import { useLinkStore } from "@/stores/link.store";
import { resolveHref } from "@/lib/href.utils";
import { Link as I18nLink } from "@/i18n/navigation";

export const LinkContentLoadable = <T extends typeof I18nLink | typeof Link>({
  href,
  tags = [],
  loader = (
    <>
      <Spinner /> Loading...
    </>
  ),
  children,
}: {
  href: ComponentProps<T>["href"];
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
