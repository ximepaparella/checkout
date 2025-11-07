/**
 * Input validation utilities
 * Provides validation functions for form inputs
 */

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates CPF (Brazilian individual taxpayer ID)
 * Format: 000.000.000-00
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleanCPF)) return false; // All same digits

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
}

/**
 * Validates CNPJ (Brazilian corporate taxpayer ID)
 * Format: 00.000.000/0000-00
 */
export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  if (cleanCNPJ.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false; // All same digits

  let length = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, length);
  const digits = cleanCNPJ.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cleanCNPJ.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
}

/**
 * Validates CPF or CNPJ (handles both formats)
 */
export function isValidCPFCNPJ(value: string): boolean {
  if (!value) return false;
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length === 11) return isValidCPF(value);
  if (cleanValue.length === 14) return isValidCNPJ(value);
  return false;
}

/**
 * Validates Brazilian phone number with DDD
 * Accepts formats: (11) 98960-1225, +5511989601225, 11989601225
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const cleanPhone = phone.replace(/\D/g, '');
  // Brazilian phone: 10 digits (DDD + number) or 11 digits (DDD + number with 9)
  // International: +55 + DDD + number (12-13 digits total)
  return cleanPhone.length >= 10 && cleanPhone.length <= 13;
}

/**
 * Validates CEP (Brazilian ZIP code)
 * Format: 00000-000
 */
export function isValidCEP(cep: string): boolean {
  if (!cep) return false;
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
}

/**
 * Checks if value is required (not empty)
 */
export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim().length > 0;
}

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
