import { unmask } from '../common/unmask';

/**
 * Formats phone number: +55 (11) 98960-1225 or (11) 98960-1225
 */
export function formatPhone(value: string): string {
  const digits = unmask(value);
  if (digits.length === 0) return '';

  // International format (starts with 55)
  if (digits.startsWith('55') && digits.length >= 12) {
    const countryCode = digits.slice(0, 2);
    const areaCode = digits.slice(2, 4);
    const number = digits.slice(4);
    if (number.length <= 4) {
      return `+${countryCode} (${areaCode}) ${number}`;
    }
    return `+${countryCode} (${areaCode}) ${number.slice(0, number.length - 4)}-${number.slice(-4)}`;
  }

  // National format
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) {
    // 7 digits: (11) 98960 (no dash yet)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    // 8-10 digits: (11) 98960-1225
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // For 11 digits (cell phone with 9)
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
