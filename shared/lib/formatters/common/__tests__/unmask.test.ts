import { describe, it, expect } from 'vitest';
import { unmask } from '../unmask';

describe('unmask', () => {
  it('should remove all non-digit characters', () => {
    expect(unmask('123.456.789-00')).toBe('12345678900');
    expect(unmask('(11) 98960-1225')).toBe('11989601225');
    expect(unmask('abc123def456')).toBe('123456');
  });
});
