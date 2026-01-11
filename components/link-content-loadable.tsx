"use client";

import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import { Spinner } from "./ui/spinner";
import Link, { useLinkStatus } from "next/link";
import { useLinkStore } from "@/stores/link.store";
import { resolveHref } from "@/lib/href.utils";
import { Link as I18nLink } from "@/i18n/navigation";
import { useLocale } from "next-intl";

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
  const setLoadingLink = useLinkStore((state) => state.setLoadingLink);
  const clearLoadingLink = useLinkStore((state) => state.clearLoadingLink);

  const { pending } = useLinkStatus();
  const locale = useLocale();

  const resolvedHref = resolveHref(href, locale);

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
