import { cn } from "@/lib/utils";
import clsx from "clsx";

export default function Note({
  children,
  title = "Note",
  type = "note",
  className
}: NoteProps) {
  const noteClassNames = clsx({
    "dark:bg-stone-950/25 bg-stone-100/90": type == "note",
    "dark:bg-red-950 bg-red-100 border-red-200 dark:border-red-900":
      type === "danger",
    "dark:bg-orange-950 bg-orange-100 border-orange-200 dark:border-orange-900":
      type === "warning",
    "dark:bg-green-950 bg-green-100 border-green-200 dark:border-green-900":
      type === "success",
  });
  return (
    <div
      className={cn(
        "border rounded-lg px-6 py-5 text-sm tracking-wide space-y-4 not-prose w-full",
        noteClassNames, className
      )}
    >
      <p className="font-bold -mb-3 text-foreground text-base">{title}:</p>
      <div>{children}</div>
    </div>
  );
}
