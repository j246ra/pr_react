export function snakeToPascal(str: string): string {
  return str
    .toLowerCase()
    .replace(/(^|_)([a-z,0-9])/g, (_, __, p1) => p1.toUpperCase());
}

export function truncate(str: string | null, length: number) {
  if (!str) return str;
  return str.length > length ? str.slice(0, length) + '...' : str;
}
