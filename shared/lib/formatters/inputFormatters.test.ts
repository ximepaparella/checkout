import { describe, it, expect } from 'vitest';
import { unmask, formatCPF, formatCNPJ, formatPhone, formatCEP } from './inputFormatters';

describe('inputFormatters', () => {
  describe('unmask', () => {
    it('should remove all non-digit characters', () => {
      expect(unmask('123.456.789-00')).toBe('12345678900');
      expect(unmask('(11) 98960-1225')).toBe('11989601225');
      expect(unmask('abc123def456')).toBe('123456');
    });
  });

  describe('formatCPF', () => {
    it('should format CPF correctly', () => {
      expect(formatCPF('11144477735')).toBe('111.444.777-35');
      expect(formatCPF('111')).toBe('111');
      expect(formatCPF('111444')).toBe('111.444');
      expect(formatCPF('111444777')).toBe('111.444.777');
    });
  });

  describe('formatCNPJ', () => {
    it('should format CNPJ correctly', () => {
      expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    });
  });

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

  describe('formatCEP', () => {
    it('should format CEP correctly', () => {
      expect(formatCEP('01310100')).toBe('01310-100');
      expect(formatCEP('01310')).toBe('01310');
    });
  });
});
