import type { InputHTMLAttributes } from 'react';

export interface InputHelperLink {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  helperLink?: InputHelperLink;
  success?: boolean;
  required?: boolean;
  optional?: boolean;
  fullWidth?: boolean;
}
