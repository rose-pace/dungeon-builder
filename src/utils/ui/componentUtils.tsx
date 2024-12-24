export function mergeClassNameProps(...classNameProps: (string | undefined)[]): string {
  return classNameProps
    .map(prop => (prop || '').trim().split(' '))
    .reduce((prev, curr) => [...prev, ...curr])
    .join(' ');
}
