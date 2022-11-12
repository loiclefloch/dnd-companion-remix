import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

export default function Textarea({
  rows = 6,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        "w-full rounded-sm border border-solid border-slate-300 p-2",
        className
      )}
      rows={rows}
      {...props}
    />
  );
}
