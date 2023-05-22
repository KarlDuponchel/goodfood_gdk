import { ComponentProps, forwardRef } from "react";
import { classNames } from "../_utils";

/**
 * Les propriétés du composant `BaseSelect`.
 */
export type BaseSelectProps = Omit<ComponentProps<"select">, "ref">;

/**
 * Un composant de type `select`.
 */
// eslint-disable-next-line react/display-name
export const BaseNbSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
    ({ className, ...props }, ref) => {
        const options: any = [];

        for (let i = 1; i <= 10; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
    return (
        <select
          ref={ref}
          className={classNames(
            "border bg-transparent cursor-pointer border-zinc-300 text-black indent-0.5 rounded disabled:opacity-50 focus:outline-none w-10",
                className
            )}
            {...props}
        >
            {options}
        </select>
        )
    } 
);