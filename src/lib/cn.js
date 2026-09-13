/**
 * cn — tiny classNames helper. Filters falsy values and joins with a space.
 * Keeps JSX readable without pulling in a dependency.
 */
export function cn(...parts) {
  return parts.flat().filter(Boolean).join(' ')
}

export default cn
