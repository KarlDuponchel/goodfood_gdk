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
    variant: "primary" | "black" | "transparent";

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
    }

    return (
        <button ref={ref} className={classNames(
            `${bgColor} ${bgColor == "bg-black" ? 'text-white' : 'text-black'} p-2 rounded-md text-center font-bold border border-primary`, className)} {...props}>
            {label}
        </button>
    );
});