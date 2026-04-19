// Feature: pest-shields-website
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

import Hero from '@/components/home/Hero';

describe('Hero — unit tests', () => {
  const defaultProps = {
    headline: 'Pest-Free Living Starts Here',
    subheadline: 'India\'s most trusted pest control company.',
    ctaLabel: 'Book a Free Inspection',
    ctaHref: '/contact',
  };

  it('renders the headline', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(defaultProps.headline)).toBeInTheDocument();
  });

  it('renders the subheadline', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(defaultProps.subheadline)).toBeInTheDocument();
  });

  it('renders the CTA button with correct href', () => {
    render(<Hero {...defaultProps} />);
    const cta = screen.getByRole('link', { name: defaultProps.ctaLabel });
    expect(cta).toHaveAttribute('href', '/contact');
  });

  it('renders trust badges', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(/free inspection/i)).toBeInTheDocument();
    expect(screen.getByText(/eco-friendly/i)).toBeInTheDocument();
    expect(screen.getByText(/25\+ years/i)).toBeInTheDocument();
  });
});
