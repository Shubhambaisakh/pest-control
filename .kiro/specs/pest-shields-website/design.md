# Design Document

## Overview

The Pest Shields website is a multi-page marketing site for an India-based pest control company. It is built with Next.js 14+ App Router, Tailwind CSS, and React hooks. The site has four public routes (`/`, `/services`, `/about`, `/contact`) sharing a common `Navbar` and `Footer`. The primary goal is a professional, responsive, conversion-focused website that communicates trust and expertise.

### Key Design Decisions

- **Next.js App Router** — file-system routing under `/app`, server components by default, client components only where interactivity is needed (Navbar mobile menu, ContactForm).
- **Tailwind CSS** — utility-first styling with a custom green palette; no separate CSS files except for global resets.
- **Static data** — services, testimonials, team members, and features are defined as typed TypeScript constants in `/lib/data.ts`; no database or API is required.
- **Client-side form validation** — `ContactForm` uses `useState` and validates on submit; no external form library needed.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│  ┌──────────────────────────────────────────────┐   │
│  │              Next.js App Router              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐  │   │
│  │  │  /       │  │/services │  │  /about   │  │   │
│  │  │  /contact│  └──────────┘  └───────────┘  │   │
│  │  └──────────┘                               │   │
│  │  Shared: RootLayout → Navbar + Footer       │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  Static Data Layer: /lib/data.ts                    │
│  (services, testimonials, team, features)           │
└─────────────────────────────────────────────────────┘
```

### Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` | Static (SSG) | No dynamic data |
| `/services` | Static (SSG) | No dynamic data |
| `/about` | Static (SSG) | No dynamic data |
| `/contact` | Static + Client Component | Form state is client-side |

---

## Folder Structure

```
pest-shields-website/
├── app/
│   ├── layout.tsx          # RootLayout — wraps all pages with Navbar + Footer
│   ├── page.tsx            # Home page (/)
│   ├── services/
│   │   └── page.tsx        # Services page (/services)
│   ├── about/
│   │   └── page.tsx        # About page (/about)
│   ├── contact/
│   │   └── page.tsx        # Contact page (/contact)
│   └── globals.css         # Tailwind base + global resets
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # 'use client' — mobile menu state
│   │   └── Footer.tsx      # Server component
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── Features.tsx
│   │   └── Testimonials.tsx
│   ├── shared/
│   │   ├── ServiceCard.tsx
│   │   ├── FeatureCard.tsx
│   │   └── TestimonialCard.tsx
│   └── contact/
│       └── ContactForm.tsx  # 'use client' — form state + validation
├── lib/
│   ├── data.ts             # Static typed data (services, testimonials, etc.)
│   └── validation.ts       # Pure validation functions (email, required fields)
├── public/
│   └── images/             # Placeholder images / icons
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Components and Interfaces

### RootLayout (`app/layout.tsx`)

Server component. Renders `<Navbar />` above and `<Footer />` below `{children}`. Applies global font and background.

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode })
```

---

### Navbar (`components/layout/Navbar.tsx`)

`'use client'` — needs `useState` for mobile drawer.

```typescript
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

**Behavior:**
- Desktop (≥768px): horizontal link list, active link highlighted via `usePathname()`.
- Mobile (<768px): hamburger icon toggles a vertical drawer; clicking a link closes the drawer.
- Uses Next.js `<Link>` for client-side navigation.

---

### Footer (`components/layout/Footer.tsx`)

Server component.

**Sections:**
1. Brand column — company name, tagline.
2. Quick links — same four nav links.
3. Contact info — phone, email, city.
4. Social icons — placeholder hrefs.
5. Copyright bar — `© {new Date().getFullYear()} Pest Shields`.

---

### Hero (`components/home/Hero.tsx`)

Server component. Full-width section with green gradient background.

```typescript
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}
```

---

### ServiceCard (`components/shared/ServiceCard.tsx`)

Server component. Displays one pest control service.

```typescript
interface ServiceCardProps {
  icon: string;        // emoji or image path
  name: string;
  description: string;
  detailed?: boolean;  // true on /services page — shows benefits list
  benefits?: string[];
  ctaHref?: string;
}
```

Hover effect: `transition-all duration-300 hover:shadow-lg hover:scale-105`

---

### FeatureCard (`components/shared/FeatureCard.tsx`)

Server component.

```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}
```

---

### TestimonialCard (`components/shared/TestimonialCard.tsx`)

Server component.

```typescript
interface TestimonialCardProps {
  customerName: string;
  rating: number;      // 1–5
  reviewText: string;
}
```

---

### ContactForm (`components/contact/ContactForm.tsx`)

`'use client'`. Manages form state and validation.

```typescript
interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

type FormStatus = 'idle' | 'success' | 'error';
```

**State:**
- `fields: FormFields` — controlled inputs.
- `errors: FormErrors` — per-field validation messages.
- `status: FormStatus` — drives success/error banner visibility.

**Validation (on submit):**
1. All fields except `phone` are required.
2. `email` must match a valid email regex.
3. On success: set `status = 'success'`, reset `fields`.
4. On failure: set `errors`, keep `status = 'idle'`.

---

## Data Models

### Service

```typescript
interface Service {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
}
```

### Testimonial

```typescript
interface Testimonial {
  id: string;
  customerName: string;
  rating: number;   // 1–5 integer
  reviewText: string;
}
```

### Feature

```typescript
interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}
```

### TeamMember

```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
}
```

### ContactFormSubmission

```typescript
interface ContactFormSubmission {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
```

---

## Page-by-Page Layout Design

### Home Page (`/`)

```
┌─────────────────────────────────┐
│ Navbar                          │
├─────────────────────────────────┤
│ Hero                            │
│  Headline + Sub + CTA button    │
├─────────────────────────────────┤
│ Services Overview               │
│  Grid of 7 ServiceCards         │
│  "View All Services" link       │
├─────────────────────────────────┤
│ Features / Why Choose Us        │
│  4-column grid of FeatureCards  │
│  25+ years metric prominent     │
├─────────────────────────────────┤
│ Testimonials                    │
│  3 TestimonialCards in a row    │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

### Services Page (`/services`)

```
┌─────────────────────────────────┐
│ Navbar                          │
├─────────────────────────────────┤
│ Page Header (title + breadcrumb)│
├─────────────────────────────────┤
│ Services List                   │
│  7 detailed ServiceCards        │
│  Each with benefits + CTA       │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

### About Page (`/about`)

```
┌─────────────────────────────────┐
│ Navbar                          │
├─────────────────────────────────┤
│ Company Overview                │
│  Mission, history, 25+ years    │
├─────────────────────────────────┤
│ Team Section                    │
│  3+ TeamMember cards            │
├─────────────────────────────────┤
│ Core Values                     │
│  Eco-friendly, customer-centric │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

### Contact Page (`/contact`)

```
┌─────────────────────────────────┐
│ Navbar                          │
├─────────────────────────────────┤
│ Two-column layout               │
│  Left: ContactForm              │
│  Right: Company contact details │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

---

## Styling Approach

### Color Tokens (Tailwind config extension)

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        50:  '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        500: '#4CAF50',   // primary
        600: '#16a34a',   // hover
        700: '#15803d',   // active / dark
        900: '#14532d',
      },
    },
  },
}
```

### Responsive Breakpoints (Tailwind defaults)

| Prefix | Min-width | Usage |
|---|---|---|
| (none) | 0px | Mobile-first base styles |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets — hamburger → nav links |
| `lg:` | 1024px | Desktop — multi-column grids |
| `xl:` | 1280px | Wide desktop |

### Typography

- Font: `Inter` (Google Fonts via `next/font/google`).
- Headings: `font-bold`, sizes `text-3xl` → `text-5xl` depending on context.
- Body: `text-gray-700`, `text-base` / `text-sm`.

### Transitions

All interactive elements use `transition-all duration-300` (300ms, within the 200–400ms spec range).

---

## Form Handling Approach

Validation lives in `lib/validation.ts` as pure functions, keeping them testable independently of React:

```typescript
export function isValidEmail(email: string): boolean
export function validateContactForm(fields: FormFields): FormErrors
```

`ContactForm` calls `validateContactForm` on submit. If `Object.keys(errors).length > 0`, it sets errors and aborts. Otherwise it simulates submission (or calls an API route), sets `status = 'success'`, and resets fields.

No external form library (react-hook-form, Formik) is used — the form is simple enough for plain `useState`.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The validation functions in `lib/validation.ts` and the pure rendering logic of card components are well-suited for property-based testing. Infrastructure, layout, and visual requirements are covered by example-based and smoke tests instead.

---

### Property 1: Active nav link is unique per route

*For any* valid route path (`/`, `/services`, `/about`, `/contact`), the Navbar should apply the active style class to exactly the link whose `href` matches that path, and no other link should have the active style class.

**Validates: Requirements 2.5**

---

### Property 2: ServiceCard (overview) renders all required fields

*For any* service object in the data array, rendering `ServiceCard` in overview mode (non-detailed) should produce output that contains the service's icon, name, and short description.

**Validates: Requirements 4.2**

---

### Property 3: FeatureCard renders all required fields

*For any* feature object in the data array, rendering `FeatureCard` should produce output that contains the feature's icon, title, and description.

**Validates: Requirements 5.2**

---

### Property 4: TestimonialCard renders all required fields

*For any* testimonial object in the data array, rendering `TestimonialCard` should produce output that contains the customer name, a rating representation, and the review text.

**Validates: Requirements 6.2**

---

### Property 5: ServiceCard (detailed) renders full service information

*For any* service object in the data array, rendering `ServiceCard` with `detailed={true}` should produce output that contains the service title, long description, at least one benefit, and a link pointing to `/contact`.

**Validates: Requirements 7.2**

---

### Property 6: Valid form fields produce no validation errors

*For any* `FormFields` object where all required fields (`fullName`, `email`, `service`, `message`) are non-empty strings and `email` is a valid email format, `validateContactForm` should return an empty `FormErrors` object (no error keys).

**Validates: Requirements 9.3**

---

### Property 7: Missing required fields produce validation errors

*For any* `FormFields` object where at least one required field (`fullName`, `email`, `service`, or `message`) is an empty or whitespace-only string, `validateContactForm` should return a `FormErrors` object containing an error entry for each missing required field.

**Validates: Requirements 9.4**

---

### Property 8: Email validation correctly classifies all inputs

*For any* string that matches a standard email pattern (local-part@domain.tld), `isValidEmail` should return `true`. *For any* string that does not match the pattern (missing `@`, missing domain, empty string, whitespace-only), `isValidEmail` should return `false`.

**Validates: Requirements 9.5**

---

### Property 9: Successful submission resets all form fields

*For any* valid `FormFields` object that passes validation, after the form processes a successful submission, all fields in the resulting state should be empty strings (equivalent to the initial empty state).

**Validates: Requirements 9.6**

---

### Property 10: Footer copyright contains the current year

*For any* rendering of the `Footer` component, the copyright text should contain the current calendar year as a string.

**Validates: Requirements 10.4**

---

## Error Handling

### Form Validation Errors

- Per-field inline error messages appear below each invalid input.
- Error messages are cleared when the user corrects the field and re-submits.
- The form does not submit (no API call) if validation fails.

### Form Submission Errors

- If a future API call fails, `status` is set to `'error'` and a generic error banner is shown.
- Fields are not reset on error so the user can retry without re-entering data.

### Navigation Errors

- Next.js App Router handles 404s automatically; a custom `not-found.tsx` can be added later.
- All internal links use `<Link>` — broken hrefs are caught at build time via TypeScript.

### Data Errors

- Static data in `lib/data.ts` is typed; TypeScript compilation catches missing required fields at build time.
- No runtime data fetching means no network error states to handle on the client.

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

Focus on specific examples, edge cases, and component rendering:

- **Navbar**: renders all four links; active link has correct class; hamburger toggles drawer; clicking link in open drawer closes it.
- **Footer**: renders company name, contact details, social links, copyright year.
- **Hero**: renders headline, sub-headline, CTA with `href="/contact"`.
- **ServiceCard**: renders icon, name, description in overview mode; renders benefits and CTA in detailed mode.
- **FeatureCard**: renders icon, title, description.
- **TestimonialCard**: renders name, rating, review text.
- **ContactForm**: all five fields present; success banner shown on valid submit; error messages shown on invalid submit; fields reset after success.
- **Data integrity**: `services.length >= 7`, `features.length >= 4`, `testimonials.length >= 3`.

### Property-Based Tests (fast-check)

Use [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native PBT library). Each test runs a minimum of **100 iterations**.

Tag format: `// Feature: pest-shields-website, Property {N}: {property_text}`

| Property | Test target | Generator |
|---|---|---|
| P1: Active nav link uniqueness | `Navbar` active class logic | `fc.constantFrom('/', '/services', '/about', '/contact')` |
| P2: ServiceCard overview fields | `ServiceCard` render | `fc.record({ icon, name, shortDescription })` |
| P3: FeatureCard fields | `FeatureCard` render | `fc.record({ icon, title, description })` |
| P4: TestimonialCard fields | `TestimonialCard` render | `fc.record({ customerName, rating: fc.integer({min:1,max:5}), reviewText })` |
| P5: ServiceCard detailed fields | `ServiceCard` detailed render | `fc.record({ ...service fields, benefits: fc.array(fc.string(), {minLength:1}) })` |
| P6: Valid form → no errors | `validateContactForm` | `fc.record({ fullName: nonEmpty, email: validEmail, service: nonEmpty, message: nonEmpty, phone: fc.string() })` |
| P7: Missing required → errors | `validateContactForm` | `fc.record` with at least one required field as empty/whitespace |
| P8: Email validation | `isValidEmail` | `fc.emailAddress()` for valid; `fc.string()` filtered for invalid |
| P9: Submission resets fields | `ContactForm` state | `fc.record` of valid FormFields |
| P10: Footer copyright year | `Footer` render | `fc.integer({ min: 2000, max: 2100 })` injected as current year |

### Smoke Tests

- Project builds without errors (`next build`).
- All four route files exist.
- `RootLayout` includes `Navbar` and `Footer`.

### Integration Tests

- Navigation links use `<Link>` components (not raw `<a>` tags).
- All internal `href` values point to valid routes.
