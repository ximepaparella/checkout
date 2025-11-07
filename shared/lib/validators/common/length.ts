/**
 * Validates minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validates maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}
