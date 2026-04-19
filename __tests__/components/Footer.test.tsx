// Feature: pest-shields-website
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

import Footer from '@/components/layout/Footer';

describe('Footer — unit tests', () => {
  it('renders the company name', () => {
    render(<Footer />);
    expect(screen.getByText(/pest shields/i)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/pest-free/i)).toBeInTheDocument();
  });

  it('renders all four quick links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^services$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^contact$/i })).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    render(<Footer />);
    expect(screen.getByText(/98765 43210/)).toBeInTheDocument();
  });

  it('renders the email address', () => {
    render(<Footer />);
    expect(screen.getByText(/info@pestshields\.com/i)).toBeInTheDocument();
  });

  it('renders the city', () => {
    render(<Footer />);
    expect(screen.getByText(/mumbai/i)).toBeInTheDocument();
  });

  it('renders the copyright notice with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});

// Feature: pest-shields-website, Property 10: Footer copyright contains the current year
describe('Footer — Property 10: copyright year', () => {
  it('copyright text always contains the current calendar year', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Footer />);
        const year = new Date().getFullYear().toString();
        expect(container.textContent).toContain(year);
      }),
      { numRuns: 1 }
    );
  });
});
