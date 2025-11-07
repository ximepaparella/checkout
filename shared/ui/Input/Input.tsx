import React, { forwardRef, useId } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  helperLink?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  success?: boolean;
  required?: boolean;
  optional?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      error,
      helperText,
      helperLink,
      success,
      required,
      optional,
      fullWidth,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText || helperLink ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    const inputClasses = [
      styles.input,
      error && styles.inputError,
      success && styles.inputSuccess,
      disabled && styles.inputDisabled,
      fullWidth && styles.inputFullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [styles.wrapper, fullWidth && styles.wrapperFullWidth]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}> *</span>}
            {optional && <span className={styles.optional}> (opcional)</span>}
          </label>
        )}
        <div className={styles.inputContainer}>
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            aria-describedby={describedBy}
            {...props}
          />
          {error && (
            <span className={styles.errorIcon} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#ef4444" />
                <path
                  d="M10 6V10M10 14H10.01"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}
          {success && !error && (
            <span className={styles.successIcon} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#22c55e" />
                <path
                  d="M6 10L9 13L14 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
        {error && (
          <span id={errorId} className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}
        {(helperText || helperLink) && (
          <div id={helperId} className={styles.helperText}>
            {helperText && <span>{helperText}</span>}
            {helperLink && (
              <button
                type="button"
                className={styles.helperLink}
                onClick={helperLink.onClick}
                {...(helperLink.href && { href: helperLink.href })}
              >
                {helperLink.text}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
