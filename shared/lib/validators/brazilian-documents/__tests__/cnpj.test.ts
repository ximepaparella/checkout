import { describe, it, expect } from 'vitest';
import { isValidCNPJ } from '../cnpj';

describe('isValidCNPJ', () => {
  it('should validate correct CNPJ', () => {
    expect(isValidCNPJ('11.222.333/0001-81')).toBe(true);
  });

  it('should reject invalid CNPJ', () => {
    expect(isValidCNPJ('11.111.111/1111-11')).toBe(false);
    expect(isValidCNPJ('')).toBe(false);
  });
});
