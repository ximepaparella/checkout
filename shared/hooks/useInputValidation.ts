import { useState, useCallback } from 'react';

type Validator = (value: string) => boolean;
type ErrorMessage = string | undefined;

interface ValidationRule {
  validator: Validator;
  message: string;
}

/**
 * Hook for managing input validation
 * Provides validation logic with error messages
 *
 * @param rules - Array of validation rules to apply
 * @returns Object with error, validate, clearError, and setError
 *
 * @example
 * ```tsx
 * const { error, validate, clearError } = useInputValidation([
 *   { validator: isRequired, message: 'Este campo deve ser preenchido' },
 *   { validator: (v) => isValidEmail(v), message: 'E-mail inválido' },
 * ]);
 *
 * const handleBlur = () => validate(value);
 * ```
 */
export function useInputValidation(rules: ValidationRule[] = []) {
  const [error, setError] = useState<ErrorMessage>(undefined);

  const validate = useCallback(
    (value: string): boolean => {
      for (const rule of rules) {
        if (!rule.validator(value)) {
          setError(rule.message);
          return false;
        }
      }
      setError(undefined);
      return true;
    },
    [rules],
  );

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  return {
    error,
    validate,
    clearError,
    setError,
  };
}
