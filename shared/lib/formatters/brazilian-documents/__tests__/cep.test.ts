import { describe, it, expect } from 'vitest';
import { formatCEP } from '../cep';

describe('formatCEP', () => {
  it('should format CEP correctly', () => {
    expect(formatCEP('01310100')).toBe('01310-100');
    expect(formatCEP('01310')).toBe('01310');
  });
});
