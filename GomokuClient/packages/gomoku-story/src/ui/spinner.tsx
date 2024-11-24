import { cn } from "@/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)} aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <svg
          key={index}
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: "1s",
            animationDelay: `${index * 0.1}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
          viewBox="0 0 50 50"
        >
          <circle
            className="text-primary"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="60 60"
            strokeDashoffset="60"
          />
        </svg>
      ))}
    </div>
  );
};

Spinner.displayName = "Spinner";
