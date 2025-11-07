/**
 * Removes all non-digit characters from a string
 */
export function unmask(value: string): string {
  return value.replace(/\D/g, '');
}
