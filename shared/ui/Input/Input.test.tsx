import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import styles from './Input.module.scss';

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label="Email" required />);
    const label = screen.getByText('Email');
    expect(label).toHaveTextContent('Email *');
  });

  it('shows optional indicator', () => {
    render(<Input label="Complemento" optional />);
    expect(screen.getByText('(opcional)')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Este campo deve ser preenchido" />);
    expect(screen.getByText('Este campo deve ser preenchido')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows error icon when error exists', () => {
    const { container } = render(<Input error="Error message" />);
    const errorIcon = container.querySelector('[aria-hidden="true"]');
    expect(errorIcon).toBeInTheDocument();
  });

  it('shows success icon when success is true', () => {
    const { container } = render(<Input success />);
    const successIcon = container.querySelector('[aria-hidden="true"]');
    expect(successIcon).toBeInTheDocument();
  });

  it('does not show success icon when error exists', () => {
    const { container } = render(<Input success error="Error" />);
    const icons = container.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBe(1); // Only error icon
  });

  it('handles helper text', () => {
    render(<Input helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('handles helper link', async () => {
    const handleClick = vi.fn();
    render(<Input helperLink={{ text: 'Click me', onClick: handleClick }} />);
    const link = screen.getByText('Click me');
    await userEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies error state styles', () => {
    const { container } = render(<Input error="Error" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain(styles.inputError);
  });

  it('applies success state styles', () => {
    const { container } = render(<Input success />);
    const input = container.querySelector('input');
    expect(input?.className).toContain(styles.inputSuccess);
  });

  it('applies disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<Input label="Email" error="Error" required />);
    // Get the label and find the input by its associated ID using getElementById
    const label = container.querySelector('label');
    const inputId = label?.getAttribute('for');
    const input = inputId ? container.querySelector(`input[id="${inputId}"]`) : null;

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('supports fullWidth prop', () => {
    const { container } = render(<Input fullWidth />);
    const wrapper = container.querySelector(`.${styles.wrapper}`);
    expect(wrapper?.className).toContain(styles.wrapperFullWidth);
  });
});
