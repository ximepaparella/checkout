import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders error icon', () => {
    const { container } = render(<Icon name="error" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  it('renders success icon', () => {
    const { container } = render(<Icon name="success" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
  });

  it('renders shield-check icon', () => {
    const { container } = render(<Icon name="shield-check" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('supports custom size', () => {
    const { container } = render(<Icon name="error" size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('supports custom className', () => {
    const { container } = render(<Icon name="error" className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('has aria-hidden by default', () => {
    const { container } = render(<Icon name="error" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports aria-label', () => {
    const { container } = render(
      <Icon name="error" aria-label="Error indicator" aria-hidden={false} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Error indicator');
    expect(svg).toHaveAttribute('role', 'img');
  });
});
