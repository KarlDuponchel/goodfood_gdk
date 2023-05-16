/*!
 * @author Karl Duponchel
 * @copyright 2021-présent PC Partners
 */

import { ComponentProps, forwardRef } from "react";
import { classNames } from "./_utils";

/**
 * Les propriétés du composant `BaseInput`.
 */
export type BaseInputProps = Omit<ComponentProps<"input">, "ref">;

/**
 * Un composant de type `input`.
 */
// eslint-disable-next-line react/display-name
export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={classNames(
        "block border bg-zinc-200 border-black text-black p-1 w-full text-sm rounded-full disabled:opacity-50 transition h-10 focus:outline-none placeholder-black indent-4",
        className
      )}
      {...props}
    />
  )
);