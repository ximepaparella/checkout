import { isValidCPF } from './cpf';
import { isValidCNPJ } from './cnpj';

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
