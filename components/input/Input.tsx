import { ComponentProps, forwardRef } from "react";
import { classNames } from "../_utils";

/**
 * Les propriétés du composant `BaseInput`.
 */
export type BaseInputProps = Omit<ComponentProps<"input">, "ref">;

/**
 * Un composant de type `input`.
 */
// eslint-disable-next-line react/display-name
export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...props }, ref) => {
  return (
    <div className="flex w-full">
      <input
        ref={ref}
        className={classNames(
          "block border-y border-l bg-zinc-200 border-black text-black p-1 w-full text-sm rounded-full rounded-r-none disabled:opacity-50 transition h-10 focus:outline-none placeholder-black indent-4",
          className
        )}
        {...props}
      />
    </div>
  )}
);