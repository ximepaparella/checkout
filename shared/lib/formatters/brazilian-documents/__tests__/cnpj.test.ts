import { describe, it, expect } from 'vitest';
import { formatCNPJ } from '../cnpj';

describe('formatCNPJ', () => {
  it('should format CNPJ correctly', () => {
    expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
  });
});
