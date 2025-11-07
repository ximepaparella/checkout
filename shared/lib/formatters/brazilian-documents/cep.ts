import { unmask } from '../common/unmask';

/**
 * Formats CEP (Brazilian ZIP code): 00000-000
 */
export function formatCEP(value: string): string {
  const digits = unmask(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
