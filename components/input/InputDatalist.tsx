import { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./Input";

/**
 * Le compteur utilisé pour générer un ID pour les `datalist`.
 */
let counter = 0;

/**
 * Les propriétés du composant `InputDatalist`.
 */
export type InputDatalistProps = BaseInputProps & {
  /**
   * La liste d'options à afficher.
   */
  options: string[];
};

/**
 * Un champ de formulaire de type `input` avec un label et une `datalist` de
 *  valeurs possibles.
 */
// eslint-disable-next-line react/display-name
export const InputDatalist = forwardRef<HTMLInputElement, InputDatalistProps>(
  ({ options, children, ...props }, ref) => (
    <label className="flex flex-col flex-grow gap-1 select-none">
      <span className="font-semibold">{children}</span>
      <BaseInput ref={ref} list={`${(counter += 1)}`} {...props} />
      <datalist id={`${counter}`}>
        {options.map((value, index) => (
          <option key={index} value={value} />
        ))}
      </datalist>
    </label>
  )
);