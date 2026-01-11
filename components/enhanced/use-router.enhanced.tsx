"use client";

import { useRouter } from "@/i18n/navigation";
import { resolveHref } from "@/lib/href.utils";
import { useLinkStore } from "@/stores/link.store";
import { useLocale } from "next-intl";
import { useEffect, useRef, useTransition } from "react";

export const useRouterEnhanced = () => {
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const setLoadingLink = useLinkStore((state) => state.setLoadingLink);
  const clearLoadingLink = useLinkStore((state) => state.clearLoadingLink);

  const targetHrefRef = useRef<string | null>(null);

  const push = (
    href: string,
    options?: Parameters<typeof router.push>[1] & { tags?: string[] },
  ) => {
    const { tags = [], ...routerOptions } = options || {};
    const resolvedHref = resolveHref(href, locale);

    targetHrefRef.current = resolvedHref;
    setLoadingLink({ href: resolvedHref, tags });

    startTransition(() => {
      router.push(resolvedHref, routerOptions);
    });
  };

  const replace = (
    href: string,
    options?: Parameters<typeof router.replace>[1] & { tags?: string[] },
  ) => {
    const { tags = [], ...routerOptions } = options || {};
    const resolvedHref = resolveHref(href, locale);

    targetHrefRef.current = resolvedHref;
    setLoadingLink({ href: resolvedHref, tags });

    startTransition(() => {
      router.replace(resolvedHref, routerOptions);
    });
  };

  useEffect(() => {
    if (!isPending && targetHrefRef.current) {
      clearLoadingLink({ href: targetHrefRef.current });
      targetHrefRef.current = null;
    }

    return () => {
      if (targetHrefRef.current) {
        clearLoadingLink({ href: targetHrefRef.current });
        targetHrefRef.current = null;
      }
    };
  }, [isPending, clearLoadingLink]);

  return {
    ...router,
    push,
    replace,
    isPending,
  };
};
