import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RootLayout from './layout';
import type { ComponentProps } from 'react';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} {...props} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: ComponentProps<'a'>) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

vi.mock('@/shared/ui/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

describe('RootLayout', () => {
  it('renders the header component', () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>,
    );

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>,
    );

    const content = screen.getByText('Test content');
    expect(content).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );

    const main = container.querySelector('main[role="main"]');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('sets correct HTML lang attribute', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );

    const html = container.querySelector('html');
    expect(html).toHaveAttribute('lang', 'pt-BR');
  });
});
