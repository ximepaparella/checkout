import { describe, it, expect } from 'vitest';
import { isValidCEP } from '../cep';

describe('isValidCEP', () => {
  it('should validate CEP', () => {
    expect(isValidCEP('01310-100')).toBe(true);
    expect(isValidCEP('01310100')).toBe(true);
  });

  it('should reject invalid CEP', () => {
    expect(isValidCEP('123')).toBe(false);
    expect(isValidCEP('')).toBe(false);
  });
});
