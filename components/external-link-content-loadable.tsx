"use client";

import { ReactNode, useEffect } from "react";
import { Spinner } from "./ui/spinner"; // تأكد من المسار
import { useLinkStore } from "@/stores/link.store";
import { resolveHref } from "@/lib/href.utils";

export const ExternalLinkContentLoadable = ({
  href,
  loader = (
    <>
      <Spinner /> Loading...
    </>
  ),
  children,
  isLoading,
}: {
  href: string;
  loader?: ReactNode;
  children?: ReactNode;
  isLoading: boolean;
}) => {
  const clearLoadingLink = useLinkStore((state) => state.clearLoadingLink);
  const resolvedHref = resolveHref(href);

  // ✅ حل مشكلة زر الرجوع (Back Button)
  // إذا عاد المستخدم من الصفحة الخارجية، يجب إطفاء اللودر
  useEffect(() => {
    const handlePageShow = () => {
      clearLoadingLink({ href: resolvedHref });
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [clearLoadingLink, resolvedHref]);

  return <>{isLoading ? loader : children}</>;
};
