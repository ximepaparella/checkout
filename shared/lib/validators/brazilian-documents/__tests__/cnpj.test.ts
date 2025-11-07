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

it('should validate correct CNPJ', () => {
  expect(isValidCNPJ('11.222.333/0001-81')).toBe(true);
  +expect(isValidCNPJ('11222333000181')).toBe(true); // unformatted
  +expect(isValidCNPJ('00.000.000/0001-91')).toBe(true); // another valid CNPJ
});

it('should reject invalid CNPJ', () => {
  expect(isValidCNPJ('11.111.111/1111-11')).toBe(false);
  expect(isValidCNPJ('')).toBe(false);
  +expect(isValidCNPJ('11.222.333/0001-82')).toBe(false); // wrong check digit
  +expect(isValidCNPJ('11.222.333/0001')).toBe(false); // too short
  +expect(isValidCNPJ('11.222.333/0001-811')).toBe(false); // too long
});
