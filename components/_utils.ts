/**
 * Réduit un ensemble de classes CSS conditionnelles.
 *
 * @param classes Un ensemble de classes CSS conditionnelles.
 * @returns Un ensemble de classes CSS.
 */
export function classNames(...classes: Array<string | undefined>): string {
    return classes.filter(Boolean).join(" ");
  }