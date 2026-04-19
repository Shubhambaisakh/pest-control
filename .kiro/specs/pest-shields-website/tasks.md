# Implementation Plan: Pest Shields Website

## Overview

Implement a multi-page Next.js 14 App Router website for a pest control company. Tasks are sequenced so each step builds on the previous: scaffolding → data/validation → layout → shared cards → page sections → pages → tests.

## Tasks

- [x] 1. Scaffold the Next.js project with Tailwind CSS and configuration files
  - Initialise a Next.js 14+ project with the App Router (`/app` directory) and TypeScript
  - Install and configure Tailwind CSS; extend `tailwind.config.ts` with the `brand` color palette (`brand.50` through `brand.900`, primary `#4CAF50`)
  - Configure `next.config.ts` (image domains, strict mode)
  - Configure `tsconfig.json` with path aliases (`@/` → project root)
  - Create `app/globals.css` with Tailwind directives and Inter font import via `next/font/google`
  - Verify `npm install && npm run dev` starts without errors
  - _Requirements: 1.1, 1.5, 12.1, 12.3_

- [x] 2. Create static data and validation utilities
  - [x] 2.1 Implement `lib/data.ts` with typed constants
    - Define and export TypeScript interfaces: `Service`, `Testimonial`, `Feature`, `TeamMember`
    - Populate `services` array with ≥7 entries (cockroach/ant, rodent, COVID-19 sanitization, lizard, bed bug, termite, mosquito)
    - Populate `features` array with ≥4 entries (25+ years, eco-friendly, certified professionals, satisfaction guarantee)
    - Populate `testimonials` array with ≥3 entries (customerName, rating 1–5, reviewText)
    - Populate `teamMembers` array with ≥3 entries (name, role, imageSrc placeholder)
    - _Requirements: 4.1, 5.1, 5.3, 6.1, 7.3, 8.2, 8.3_

  - [x] 2.2 Implement `lib/validation.ts` with pure validation functions
    - Export `isValidEmail(email: string): boolean` using a standard email regex
    - Export `validateContactForm(fields: FormFields): FormErrors` — required fields: `fullName`, `email`, `service`, `message`; optional: `phone`
    - Define and export `FormFields` and `FormErrors` interfaces in this file
    - _Requirements: 9.4, 9.5_

  - [x]* 2.3 Write property tests for `isValidEmail` (Property 8)
    - **Property 8: Email validation correctly classifies all inputs**
    - **Validates: Requirements 9.5**
    - Use `fc.emailAddress()` for valid inputs (expect `true`) and filtered `fc.string()` for invalid inputs (expect `false`)

  - [x]* 2.4 Write property tests for `validateContactForm` — valid inputs (Property 6)
    - **Property 6: Valid form fields produce no validation errors**
    - **Validates: Requirements 9.3**
    - Generate `fc.record` with all required fields as non-empty strings and a valid email; assert returned `FormErrors` has no keys

  - [x]* 2.5 Write property tests for `validateContactForm` — missing required fields (Property 7)
    - **Property 7: Missing required fields produce validation errors**
    - **Validates: Requirements 9.4**
    - Generate `fc.record` with at least one required field empty/whitespace; assert returned `FormErrors` contains an error key for each missing field

- [x] 3. Implement layout components (Navbar and Footer)
  - [x] 3.1 Implement `components/layout/Navbar.tsx`
    - Mark as `'use client'`; use `useState` for mobile drawer open/close
    - Define `NAV_LINKS` constant with four entries (Home `/`, Services `/services`, About `/about`, Contact `/contact`)
    - Use `usePathname()` to apply active link style (`text-brand-700 font-semibold` or equivalent)
    - Desktop (≥`md:`): render horizontal link list using Next.js `<Link>`
    - Mobile (<`md:`): render hamburger icon that toggles a vertical drawer; clicking a link closes the drawer
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 11.3_

  - [x]* 3.2 Write unit tests for Navbar
    - Renders all four nav links
    - Active link has the active class for each route
    - Hamburger button toggles the mobile drawer
    - Clicking a link in the open drawer closes it
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x]* 3.3 Write property test for Navbar active link uniqueness (Property 1)
    - **Property 1: Active nav link is unique per route**
    - **Validates: Requirements 2.5**
    - Use `fc.constantFrom('/', '/services', '/about', '/contact')`; assert exactly one link has the active class

  - [x] 3.4 Implement `components/layout/Footer.tsx`
    - Server component; four sections: brand/tagline, quick links, contact info, social icons
    - Render `© {new Date().getFullYear()} Pest Shields` in the copyright bar
    - Display phone, email, and city/region
    - Social media icon links with placeholder `href="#"`
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x]* 3.5 Write unit tests for Footer
    - Renders company name and tagline
    - Renders all four nav links
    - Renders phone, email, city
    - Renders copyright with current year
    - _Requirements: 10.1, 10.2, 10.4_

  - [x]* 3.6 Write property test for Footer copyright year (Property 10)
    - **Property 10: Footer copyright contains the current year**
    - **Validates: Requirements 10.4**
    - Inject a mocked `Date` or year prop; use `fc.integer({ min: 2000, max: 2100 })`; assert rendered output contains the year string

  - [x] 3.7 Implement `app/layout.tsx` (RootLayout)
    - Server component wrapping all pages with `<Navbar />` above and `<Footer />` below `{children}`
    - Apply Inter font and global background via `globals.css`
    - _Requirements: 1.3_

- [x] 4. Implement shared card components
  - [x] 4.1 Implement `components/shared/ServiceCard.tsx`
    - Accept `ServiceCardProps`: `icon`, `name`, `description`, `detailed?`, `benefits?`, `ctaHref?`
    - Overview mode: render icon, name, short description with hover effect `transition-all duration-300 hover:shadow-lg hover:scale-105`
    - Detailed mode (`detailed={true}`): additionally render long description, benefits list, and CTA `<Link>` to `ctaHref`
    - _Requirements: 4.2, 4.3, 7.2, 12.2_

  - [x]* 4.2 Write property test for ServiceCard overview mode (Property 2)
    - **Property 2: ServiceCard (overview) renders all required fields**
    - **Validates: Requirements 4.2**
    - Generate `fc.record({ icon: fc.string(), name: fc.string(), description: fc.string() })`; assert rendered output contains all three values

  - [x]* 4.3 Write property test for ServiceCard detailed mode (Property 5)
    - **Property 5: ServiceCard (detailed) renders full service information**
    - **Validates: Requirements 7.2**
    - Generate a full service record with `benefits: fc.array(fc.string(), { minLength: 1 })`; assert title, long description, ≥1 benefit, and `/contact` link are present

  - [x] 4.4 Implement `components/shared/FeatureCard.tsx`
    - Accept `FeatureCardProps`: `icon`, `title`, `description`
    - Render icon, title, and description in a card layout
    - _Requirements: 5.2_

  - [x]* 4.5 Write property test for FeatureCard (Property 3)
    - **Property 3: FeatureCard renders all required fields**
    - **Validates: Requirements 5.2**
    - Generate `fc.record({ icon: fc.string(), title: fc.string(), description: fc.string() })`; assert all three values appear in rendered output

  - [x] 4.6 Implement `components/shared/TestimonialCard.tsx`
    - Accept `TestimonialCardProps`: `customerName`, `rating` (1–5), `reviewText`
    - Render customer name, star rating representation, and review text in a card layout
    - _Requirements: 6.2_

  - [x]* 4.7 Write property test for TestimonialCard (Property 4)
    - **Property 4: TestimonialCard renders all required fields**
    - **Validates: Requirements 6.2**
    - Generate `fc.record({ customerName: fc.string(), rating: fc.integer({ min: 1, max: 5 }), reviewText: fc.string() })`; assert all three values appear in rendered output

- [x] 5. Checkpoint — Ensure all tests pass
  - Run the test suite; confirm all unit and property tests written so far pass. Ask the user if any questions arise before continuing.

- [x] 6. Implement Home page sections
  - [x] 6.1 Implement `components/home/Hero.tsx`
    - Server component accepting `HeroProps`: `headline`, `subheadline`, `ctaLabel`, `ctaHref`
    - Full-width section with green gradient background using `brand` color tokens
    - Render headline, sub-headline, and a CTA `<Link>` button pointing to `/contact`
    - _Requirements: 3.1, 3.2, 3.3_

  - [x]* 6.2 Write unit tests for Hero
    - Renders headline and sub-headline text
    - CTA button has `href="/contact"`
    - _Requirements: 3.1, 3.3_

  - [x] 6.3 Implement `components/home/ServicesOverview.tsx`
    - Server component; import `services` from `lib/data.ts`
    - Render a responsive grid of `ServiceCard` components (overview mode) for all services
    - Include a "View All Services" `<Link>` pointing to `/services`
    - _Requirements: 4.1, 4.4_

  - [x] 6.4 Implement `components/home/Features.tsx`
    - Server component; import `features` from `lib/data.ts`
    - Render a 4-column responsive grid of `FeatureCard` components
    - Display "25+ Years Experience" metric prominently in the section heading or a stat block
    - _Requirements: 5.1, 5.3_

  - [x] 6.5 Implement `components/home/Testimonials.tsx`
    - Server component; import `testimonials` from `lib/data.ts`
    - Render testimonials in a card row/grid layout using `TestimonialCard`
    - _Requirements: 6.1, 6.3_

  - [x] 6.6 Assemble `app/page.tsx` (Home page)
    - Compose `Hero`, `ServicesOverview`, `Features`, and `Testimonials` sections in order
    - Pass static props to `Hero` (headline, sub-headline, CTA)
    - _Requirements: 1.2, 3.1, 4.1, 5.1, 6.1_

- [x] 7. Implement Services page (`app/services/page.tsx`)
  - Server component; import `services` from `lib/data.ts`
  - Render a page header with title and breadcrumb
  - Render all services as `ServiceCard` components in detailed mode (`detailed={true}`, `ctaHref="/contact"`)
  - Each card shows title, long description, benefits list, and CTA button
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 8. Implement About page (`app/about/page.tsx`)
  - Server component; import `teamMembers` from `lib/data.ts`
  - Company overview section: mission statement, history, founding year, "25+ years of experience"
  - Team section: render ≥3 `TeamMember` cards (name, role, placeholder image via `<Image />`)
  - Core values section: eco-friendly, customer-centric, professional
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 9. Implement Contact page and ContactForm
  - [x] 9.1 Implement `components/contact/ContactForm.tsx`
    - Mark as `'use client'`; manage `fields: FormFields`, `errors: FormErrors`, `status: FormStatus` with `useState`
    - Render controlled inputs for: full name, email, phone, service (dropdown from `services` data), message
    - On submit: call `validateContactForm`; if errors exist set `errors` state; if valid set `status = 'success'` and reset all fields to empty strings
    - Display inline error messages below each invalid field
    - Display a success confirmation banner when `status === 'success'`
    - _Requirements: 9.1, 9.3, 9.4, 9.5, 9.6_

  - [x]* 9.2 Write unit tests for ContactForm
    - All five fields are rendered
    - Success banner appears on valid submit
    - Inline error messages appear on invalid submit
    - Fields reset to empty after successful submission
    - _Requirements: 9.1, 9.3, 9.4, 9.6_

  - [x]* 9.3 Write property test for form submission field reset (Property 9)
    - **Property 9: Successful submission resets all form fields**
    - **Validates: Requirements 9.6**
    - Generate valid `fc.record` of `FormFields`; simulate submit; assert all field values in resulting state are empty strings

  - [x] 9.4 Assemble `app/contact/page.tsx`
    - Two-column layout: left column renders `ContactForm`, right column renders company contact details (address, phone, email)
    - _Requirements: 9.1, 9.2_

- [x] 10. Checkpoint — Ensure all tests pass
  - Run the full test suite; confirm all unit and property tests pass. Ask the user if any questions arise before continuing.

- [x] 11. Data integrity and smoke tests
  - [x]* 11.1 Write unit tests for data integrity in `lib/data.ts`
    - Assert `services.length >= 7`
    - Assert `features.length >= 4`
    - Assert `testimonials.length >= 3`
    - Assert `teamMembers.length >= 3`
    - _Requirements: 4.1, 5.1, 6.1, 7.3, 8.3_

  - [x]* 11.2 Write smoke tests for project structure
    - Assert all four route files exist (`app/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`)
    - Assert `app/layout.tsx` imports and renders `Navbar` and `Footer`
    - Assert all internal `<Link>` hrefs point to valid routes (`/`, `/services`, `/about`, `/contact`)
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 12. Final checkpoint — Ensure all tests pass
  - Run the complete test suite one final time; confirm zero failures. Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check`; unit tests use Vitest + React Testing Library
- All code is TypeScript; components follow the interfaces defined in `design.md`
- Checkpoints at tasks 5, 10, and 12 provide incremental validation gates
