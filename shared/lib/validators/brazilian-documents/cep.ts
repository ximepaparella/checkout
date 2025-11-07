/**
 * Validates CEP (Brazilian ZIP code)
 * Format: 00000-000
 */
export function isValidCEP(cep: string): boolean {
  if (!cep) return false;
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
}
