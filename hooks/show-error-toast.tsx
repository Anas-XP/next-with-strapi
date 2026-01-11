import { formatToTitleCase, removePrefix } from "@/lib/string.utils";
import { toast } from "sonner";

export const showToastFromError = (error: Error) => {
  toast.error(`${formatToTitleCase(error.name)}`, {
    description: () => (
      <div>
        <p>{removePrefix(error.message)}</p>
      </div>
    ),
    id: error.message,
  });
};
