import { AlertTriangle, Inbox, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const panelBaseClass =
  "surface flex flex-col items-center justify-center gap-3 px-6 py-8 text-center";

export function EmptyState({
  title = "No results yet",
  description = "Try adjusting filters or searching with different values.",
  className,
}) {
  return (
    <div className={cn(panelBaseClass, className)}>
      <div className="rounded-full bg-secondary p-3 text-muted-foreground">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please refresh and try again.",
  className,
}) {
  return (
    <div className={cn(panelBaseClass, className)}>
      <div className="rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function LoadingState({
  title = "Loading",
  description = "Fetching the latest information.",
  className,
}) {
  return (
    <div className={cn(panelBaseClass, className)}>
      <div className="rounded-full bg-secondary p-3 text-primary">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
