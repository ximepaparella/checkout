import { useState, useCallback } from 'react';

type Formatter = (value: string) => string;

/**
 * Hook for managing formatted input values
 * Automatically formats input values as the user types
 *
 * @param initialValue - Initial value for the input
 * @param formatter - Optional formatter function to apply on change
 * @returns Object with value, setValue, and handleChange
 *
 * @example
 * ```tsx
 * const { value, handleChange } = useFormattedInput('', formatCPF);
 * <Input value={value} onChange={handleChange} />
 * ```
 */
export function useFormattedInput(initialValue: string = '', formatter?: Formatter) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = formatter ? formatter(e.target.value) : e.target.value;
      setValue(newValue);
    },
    [formatter],
  );

  return {
    value,
    setValue,
    handleChange,
  };
}
