import { describe, it, expect } from 'vitest';
import { isValidCPF } from '../cpf';

describe('isValidCPF', () => {
  it('should validate correct CPF', () => {
    expect(isValidCPF('111.444.777-35')).toBe(true);
    expect(isValidCPF('11144477735')).toBe(true);
  });

  it('should reject invalid CPF', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false);
    expect(isValidCPF('12345678901')).toBe(false);
    expect(isValidCPF('')).toBe(false);
  });
});
