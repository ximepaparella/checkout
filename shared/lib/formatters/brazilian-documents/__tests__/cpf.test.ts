import { describe, it, expect } from 'vitest';
import { formatCPF } from '../cpf';

describe('formatCPF', () => {
  it('should format CPF correctly', () => {
    expect(formatCPF('11144477735')).toBe('111.444.777-35');
    expect(formatCPF('111')).toBe('111');
    expect(formatCPF('111444')).toBe('111.444');
    expect(formatCPF('111444777')).toBe('111.444.777');
  });
});
