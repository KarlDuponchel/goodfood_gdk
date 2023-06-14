import { ComponentProps, forwardRef } from "react";
import { classNames } from "../_utils";

export type InputAccountProps = ComponentProps<"input"> & {
    /**
     * Le label du champ.
     */
    label: string;

    /**
     * Style supplémentaire du composant si nécessaire.
     */
    className?: string;
}

// eslint-disable-next-line react/display-name
export const BaseInputAccount = forwardRef<HTMLInputElement, InputAccountProps>(({label, className, ...props}, ref) => {
    return (
        <div className="flex flex-col w-11/12 gap-1">
            <label className="text-black font-bold">{label}</label>
            <input
                className={classNames("block border rounded-md bg-white border-zinc-300 text-black p-1 w-full disabled:opacity-50 h-8 focus:outline-none")}
                {...props}
            />
        </div>
    );
});