import { describe, it, expect } from 'vitest';
import { minLength, maxLength } from '../length';

describe('minLength', () => {
  it('should validate minimum length', () => {
    expect(minLength('test', 4)).toBe(true);
    expect(minLength('test', 3)).toBe(true);
  });

  it('should reject values below minimum', () => {
    expect(minLength('te', 4)).toBe(false);
  });
});

describe('maxLength', () => {
  it('should validate maximum length', () => {
    expect(maxLength('test', 4)).toBe(true);
    expect(maxLength('te', 4)).toBe(true);
  });

  it('should reject values above maximum', () => {
    expect(maxLength('test', 3)).toBe(false);
  });
});
