import { describe, it, expect } from 'vitest';
import { isValidPhone } from '../phone';

describe('isValidPhone', () => {
  it('should validate phone numbers', () => {
    expect(isValidPhone('(11) 98960-1225')).toBe(true);
    expect(isValidPhone('11989601225')).toBe(true);
    expect(isValidPhone('+5511989601225')).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('')).toBe(false);
  });
});
