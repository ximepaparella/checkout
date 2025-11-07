import { describe, it, expect } from 'vitest';
import { isRequired } from '../required';

describe('isRequired', () => {
  it('should validate required values', () => {
    expect(isRequired('test')).toBe(true);
    expect(isRequired('  test  ')).toBe(true);
  });

  it('should reject empty values', () => {
    expect(isRequired('')).toBe(false);
    expect(isRequired('   ')).toBe(false);
    expect(isRequired(undefined)).toBe(false);
    expect(isRequired(null)).toBe(false);
  });
});
