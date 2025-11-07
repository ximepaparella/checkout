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
