import { showToastFromError } from "@/hooks/show-error-toast";
import { isNextRedirect } from "@/lib/next-redirect.utils";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus by default
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message === "Not Found")
          return false;
        if ("status" in error && error.status === 404) return false;
        return failureCount < 2;
      },
    },
  },
  mutationCache: new MutationCache({
    onSuccess() {},
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.meta?.disableGlobalErrorHandling) return;

      if (isNextRedirect(error)) {
        return;
      }

      showToastFromError(error);
    },
  }),
  queryCache: new QueryCache({}),
});
