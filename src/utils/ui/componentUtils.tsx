/**
 * Utility function to merge class names from multiple props into a single string
 * @param classNameProps array of strings containing class names that may be space separated
 * @returns a merged string of class names
 */
export function mergeClassNameProps(...classNameProps: (string | undefined)[]): string {
  return classNameProps
    .map(prop => (prop || '').trim().split(' '))
    .reduce((prev, curr) => [...prev, ...curr])
    .join(' ');
}
