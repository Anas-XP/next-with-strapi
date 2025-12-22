import { toast } from "sonner";
import { create } from "zustand";
import { ScaleLoader } from "react-spinners";
import { CheckCircle2Icon } from "lucide-react";

const GLOBAL_ROUTE_LOADING_TOAST_ID = "global-route-loading";
const GLOBAL_ROUTE_LOADING_TOAST_SHARED_STYLE = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",
  width: "max-content",
  justifySelf: "center",
  opacity: "75%",
};

type LinkStore = {
  loadingHref: string | null;
  loadingTags: string[];

  setLoadingLink: ({ href, tags }: { href: string; tags?: string[] }) => void;
  clearLoadingLink: ({ href }: { href: string }) => void;
};

export const useLinkStore = create<LinkStore>((set) => ({
  loadingHref: null,
  loadingTags: [],
  setLoadingLink({ href, tags = [] }) {
    toast.loading(
      <ScaleLoader color="var(--primary)" width={2} height={17} />,
      {
        position: "top-center",
        duration: Infinity,
        dismissible: false,
        closeButton: false,
        icon: null,
        richColors: false,
        id: GLOBAL_ROUTE_LOADING_TOAST_ID,
        style: {
          backgroundColor: "var(--primary-foreground)",
          ...GLOBAL_ROUTE_LOADING_TOAST_SHARED_STYLE,
        },
      },
    );

    return set({
      loadingHref: href,
      loadingTags: tags,
    });
  },
  clearLoadingLink({ href }) {
    return set((state) => {
      if (state.loadingHref === href) {
        toast.success(<CheckCircle2Icon color="var(--primary-foreground)" />, {
          id: GLOBAL_ROUTE_LOADING_TOAST_ID,
          duration: 500,
          style: {
            backgroundColor: "var(--primary)",
            ...GLOBAL_ROUTE_LOADING_TOAST_SHARED_STYLE,
          },
        });

        return {
          loadingHref: null,
          loadingTags: [],
        };
      }

      return {};
    });
  },
}));
