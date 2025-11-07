import React, { forwardRef, useId, useMemo } from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icon';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
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

    const { errorId, helperId, describedBy } = useMemo(
      () => ({
        errorId: error ? `${inputId}-error` : undefined,
        helperId: helperText || helperLink ? `${inputId}-helper` : undefined,
        describedBy:
          [
            error ? `${inputId}-error` : undefined,
            helperText || helperLink ? `${inputId}-helper` : undefined,
          ]
            .filter(Boolean)
            .join(' ') || undefined,
      }),
      [inputId, error, helperText, helperLink],
    );

    const inputClasses = useMemo(
      () =>
        [
          styles.input,
          error && styles.inputError,
          success && styles.inputSuccess,
          disabled && styles.inputDisabled,
          fullWidth && styles.inputFullWidth,
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [error, success, disabled, fullWidth, className],
    );

    const wrapperClasses = useMemo(
      () => [styles.wrapper, fullWidth && styles.wrapperFullWidth].filter(Boolean).join(' '),
      [fullWidth],
    );

    const showIcon = (error || success) && !disabled;

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
          {showIcon && (
            <span className={error ? styles.errorIcon : styles.successIcon} aria-hidden="true">
              <Icon name={error ? 'error' : 'success'} size={20} aria-hidden={true} />
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
            {helperLink &&
              (helperLink.href ? (
                <Link href={helperLink.href} className={styles.helperLink}>
                  {helperLink.text}
                </Link>
              ) : (
                <button type="button" className={styles.helperLink} onClick={helperLink.onClick}>
                  {helperLink.text}
                </button>
              ))}
          </div>
        )}
      </div>
    );
  },
);

InputComponent.displayName = 'Input';

export const Input = React.memo(InputComponent);
