import { ComponentProps, forwardRef } from "react";
import { classNames } from "../_utils";

export type ButtonProps = ComponentProps<"button"> & {
    /**
     * Le label du champ.
     */
    label: string;

    /**
     * Variants de background du bouton
     */
    variant: "primary" | "black" | "transparent" | "white";

    /**
     * Style supplémentaire du bouton si nécessaire.
     */
    className?: string;
}

// eslint-disable-next-line react/display-name
export const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(({label, variant, className, ...props}, ref) => {
    let bgColor: string = "";

    switch (variant) {
        case "primary":
            bgColor = "bg-primary";
            break;
        case "black":
            bgColor = "bg-black";
            break;
        case "transparent":
            bgColor = "bg-transparent";
            break;
        case "white":
            bgColor = "bg-slate-50";
            break;
    }

    return (
        <button ref={ref} className={classNames(
            `${bgColor} p-2 ${bgColor == "bg-black" ? 'text-white border border-black' : bgColor == "bg-slate-50" ? 'text-black border border-black' : 'text-black border border-primary'} rounded-md text-center font-bold`, className)} {...props}>
            {label}
        </button>
    );
});