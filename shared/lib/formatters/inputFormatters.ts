/**
 * Input formatting utilities
 * Provides formatting functions for masked inputs (CPF, CNPJ, Phone, CEP)
 */

/**
 * Removes all non-digit characters from a string
 */
export function unmask(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Formats CPF: 000.000.000-00
 */
export function formatCPF(value: string): string {
  const digits = unmask(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Formats CNPJ: 00.000.000/0000-00
 */
export function formatCNPJ(value: string): string {
  const digits = unmask(value).slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

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

/**
 * Formats CEP (Brazilian ZIP code): 00000-000
 */
export function formatCEP(value: string): string {
  const digits = unmask(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
