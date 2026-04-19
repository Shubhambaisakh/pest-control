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

import ServiceCard from '@/components/shared/ServiceCard';
import FeatureCard from '@/components/shared/FeatureCard';
import TestimonialCard from '@/components/shared/TestimonialCard';

// ─── ServiceCard ──────────────────────────────────────────────────────────────

// Feature: pest-shields-website, Property 2: ServiceCard (overview) renders all required fields
describe('ServiceCard overview — Property 2', () => {
  it('always renders icon, name, and description in overview mode', () => {
    fc.assert(
      fc.property(
        fc.record({
          icon: fc.string({ minLength: 1, maxLength: 4 }),
          name: fc.string({ minLength: 1, maxLength: 50 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
        }),
        ({ icon, name, description }) => {
          const { container } = render(
            <ServiceCard icon={icon} name={name} description={description} />
          );
          expect(container.textContent).toContain(icon);
          expect(container.textContent).toContain(name);
          expect(container.textContent).toContain(description);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: pest-shields-website, Property 5: ServiceCard (detailed) renders full service information
describe('ServiceCard detailed — Property 5', () => {
  it('always renders name, description, at least one benefit, and /contact link in detailed mode', () => {
    fc.assert(
      fc.property(
        fc.record({
          icon: fc.string({ minLength: 1, maxLength: 4 }),
          name: fc.string({ minLength: 1, maxLength: 50 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
          benefits: fc.array(fc.string({ minLength: 1, maxLength: 80 }), { minLength: 1, maxLength: 5 }),
        }),
        ({ icon, name, description, benefits }) => {
          const { container } = render(
            <ServiceCard
              icon={icon}
              name={name}
              description={description}
              detailed={true}
              benefits={benefits}
              ctaHref="/contact"
            />
          );
          expect(container.textContent).toContain(name);
          expect(container.textContent).toContain(description);
          expect(container.textContent).toContain(benefits[0]);
          const ctaLink = container.querySelector('a[href="/contact"]');
          expect(ctaLink).not.toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── FeatureCard ──────────────────────────────────────────────────────────────

// Feature: pest-shields-website, Property 3: FeatureCard renders all required fields
describe('FeatureCard — Property 3', () => {
  it('always renders icon, title, and description', () => {
    fc.assert(
      fc.property(
        fc.record({
          icon: fc.string({ minLength: 1, maxLength: 4 }),
          title: fc.string({ minLength: 1, maxLength: 60 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
        }),
        ({ icon, title, description }) => {
          const { container } = render(
            <FeatureCard icon={icon} title={title} description={description} />
          );
          expect(container.textContent).toContain(icon);
          expect(container.textContent).toContain(title);
          expect(container.textContent).toContain(description);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── TestimonialCard ──────────────────────────────────────────────────────────

// Feature: pest-shields-website, Property 4: TestimonialCard renders all required fields
describe('TestimonialCard — Property 4', () => {
  it('always renders customerName, rating stars, and reviewText', () => {
    fc.assert(
      fc.property(
        fc.record({
          customerName: fc.string({ minLength: 1, maxLength: 60 }),
          rating: fc.integer({ min: 1, max: 5 }),
          reviewText: fc.string({ minLength: 1, maxLength: 300 }),
        }),
        ({ customerName, rating, reviewText }) => {
          const { container } = render(
            <TestimonialCard
              customerName={customerName}
              rating={rating}
              reviewText={reviewText}
            />
          );
          expect(container.textContent).toContain(customerName);
          expect(container.textContent).toContain(reviewText);
          // Stars: filled count should equal rating
          const filledStars = (container.textContent?.match(/★/g) || []).length;
          expect(filledStars).toBe(rating);
        }
      ),
      { numRuns: 100 }
    );
  });
});
