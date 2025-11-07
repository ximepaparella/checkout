import { describe, it, expect } from 'vitest';
import { formatPhone } from '../phone';

describe('formatPhone', () => {
  it('should format national phone', () => {
    expect(formatPhone('11989601225')).toBe('(11) 98960-1225');
    expect(formatPhone('11')).toBe('11');
    expect(formatPhone('1198960')).toBe('(11) 98960');
  });

  it('should format international phone', () => {
    expect(formatPhone('5511989601225')).toBe('+55 (11) 98960-1225');
  });
});
