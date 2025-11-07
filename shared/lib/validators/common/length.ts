/**
 * Validates minimum length
 */
export function minLength(value: string, min: number): boolean {
  if (!value) return false;
  return value.length >= min;
}

/**
 * Validates maximum length
 */
export function maxLength(value: string, max: number): boolean {
  if (!value) return false;
  return value.length <= max;
}
