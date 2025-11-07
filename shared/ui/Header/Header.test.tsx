import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from './Header';
import type { ComponentProps } from 'react';

// Mock Next.js Image and Link components
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

describe('Header', () => {
  it('renders the header component', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders the Inspire logo with link', () => {
    render(<Header />);

    const logoLink = screen.getByLabelText(/Inspire.*página inicial/i);
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoText = screen.getByText('Inspire');
    expect(logoText).toBeInTheDocument();

    // Logo image should have empty alt text (decorative)
    const logoImage = screen.getByAltText('');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders the security badge', () => {
    render(<Header />);

    const securityBadge = screen.getByLabelText(/Compra segura/i);
    expect(securityBadge).toBeInTheDocument();

    const badgeTitle = screen.getByText('COMPRA SEGURA');
    expect(badgeTitle).toBeInTheDocument();

    const badgeSubtitle = screen.getByText('100% PROTEGIDO');
    expect(badgeSubtitle).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header[role="banner"]');
    expect(header).toBeInTheDocument();

    const complementary = container.querySelector('[role="complementary"]');
    expect(complementary).toBeInTheDocument();
  });

  it('renders logo image with correct attributes', () => {
    render(<Header />);

    // Logo image should have empty alt text (decorative image with visible text)
    const logoImage = screen.getByAltText('');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo.svg');
    expect(logoImage).toHaveAttribute('width', '120');
    expect(logoImage).toHaveAttribute('height', '32');
  });
});
