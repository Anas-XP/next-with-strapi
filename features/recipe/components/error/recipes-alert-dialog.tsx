import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { RotateCwIcon } from "lucide-react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

export const RecipesAlertDialog: ErrorComponent = ({ error, reset }) => {
  return (
    <AlertDialog open defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive flex items-center gap-2">
            Something Went Wrong
          </AlertDialogTitle>
          <AlertDialogDescription className="text-destructive/80">
            {error.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {reset && (
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={reset}
              className={buttonVariants({ variant: "secondary" })}
            >
              <RotateCwIcon /> Re-try
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
