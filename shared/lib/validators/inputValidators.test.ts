import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
  isValidCPFCNPJ,
  isValidPhone,
  isValidCEP,
  isRequired,
  minLength,
  maxLength,
} from './inputValidators';

describe('inputValidators', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidCPF', () => {
    it('should validate correct CPF', () => {
      expect(isValidCPF('111.444.777-35')).toBe(true);
      expect(isValidCPF('11144477735')).toBe(true);
    });

    it('should reject invalid CPF', () => {
      expect(isValidCPF('111.111.111-11')).toBe(false);
      expect(isValidCPF('12345678901')).toBe(false);
      expect(isValidCPF('')).toBe(false);
    });
  });

  describe('isValidCNPJ', () => {
    it('should validate correct CNPJ', () => {
      expect(isValidCNPJ('11.222.333/0001-81')).toBe(true);
    });

    it('should reject invalid CNPJ', () => {
      expect(isValidCNPJ('11.111.111/1111-11')).toBe(false);
      expect(isValidCNPJ('')).toBe(false);
    });
  });

  describe('isValidCPFCNPJ', () => {
    it('should validate CPF', () => {
      expect(isValidCPFCNPJ('111.444.777-35')).toBe(true);
    });

    it('should validate CNPJ', () => {
      expect(isValidCPFCNPJ('11.222.333/0001-81')).toBe(true);
    });

    it('should reject invalid values', () => {
      expect(isValidCPFCNPJ('123')).toBe(false);
      expect(isValidCPFCNPJ('')).toBe(false);
    });
  });

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
});
