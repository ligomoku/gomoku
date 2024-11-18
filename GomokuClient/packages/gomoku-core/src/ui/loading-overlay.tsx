import { Spinner } from "@/ui/spinner";
import { cn } from "@/utils";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay = ({ isVisible }: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
      )}
    >
      <Spinner size="lg" className="text-white" />
    </div>
  );
};
