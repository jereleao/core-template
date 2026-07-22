import { cn } from "~/utils/index";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "dark:bg-muted animate-pulse rounded-md bg-gray-300",
        className,
      )}
      {...props}
    />
  );
}

function InputSkeletion({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "dark:bg-muted animate-pulse rounded-md bg-gray-300",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
