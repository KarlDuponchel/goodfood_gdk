import { ComponentProps, forwardRef } from "react";
import { classNames } from "../_utils";

export type InputConnectProps = ComponentProps<"input"> & {
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
export const BaseInputConnect = forwardRef<HTMLInputElement, InputConnectProps>(({label, className, ...props}, ref) => {
    return (
        <div className="flex flex-col w-11/12">
            <label className="text-sm text-black">{label}</label>
            <input
                ref={ref}
                className="block border-b bg-inherit border-gray-400 text-black p-1 w-full text-sm disabled:opacity-50 h-8 focus:outline-none"
                {...props}
            />
        </div>
    );
});