// Feature: pest-shields-website — smoke tests
import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '../..');

function exists(rel: string) {
  return existsSync(resolve(root, rel));
}

describe('Project structure — smoke tests', () => {
  it('app/page.tsx exists', () => expect(exists('app/page.tsx')).toBe(true));
  it('app/services/page.tsx exists', () => expect(exists('app/services/page.tsx')).toBe(true));
  it('app/about/page.tsx exists', () => expect(exists('app/about/page.tsx')).toBe(true));
  it('app/contact/page.tsx exists', () => expect(exists('app/contact/page.tsx')).toBe(true));
  it('app/layout.tsx exists', () => expect(exists('app/layout.tsx')).toBe(true));
  it('components/layout/Navbar.tsx exists', () => expect(exists('components/layout/Navbar.tsx')).toBe(true));
  it('components/layout/Footer.tsx exists', () => expect(exists('components/layout/Footer.tsx')).toBe(true));
  it('components/contact/ContactForm.tsx exists', () => expect(exists('components/contact/ContactForm.tsx')).toBe(true));
  it('lib/data.ts exists', () => expect(exists('lib/data.ts')).toBe(true));
  it('lib/validation.ts exists', () => expect(exists('lib/validation.ts')).toBe(true));
  it('tailwind.config.ts exists', () => expect(exists('tailwind.config.ts')).toBe(true));
  it('package.json exists', () => expect(exists('package.json')).toBe(true));
});

describe('app/layout.tsx — imports Navbar and Footer', () => {
  it('layout.tsx source references Navbar', async () => {
    const { readFileSync } = await import('fs');
    const src = readFileSync(resolve(root, 'app/layout.tsx'), 'utf-8');
    expect(src).toContain('Navbar');
    expect(src).toContain('Footer');
  });
});

describe('Internal Link hrefs — valid routes only', () => {
  const validRoutes = ['/', '/services', '/about', '/contact'];

  it('Navbar only links to valid routes', async () => {
    const { readFileSync } = await import('fs');
    const src = readFileSync(resolve(root, 'components/layout/Navbar.tsx'), 'utf-8');
    for (const route of validRoutes) {
      expect(src).toContain(`href: '${route}'`);
    }
  });

  it('Footer only links to valid routes', async () => {
    const { readFileSync } = await import('fs');
    const src = readFileSync(resolve(root, 'components/layout/Footer.tsx'), 'utf-8');
    for (const route of validRoutes) {
      expect(src).toContain(`href="${route}"`);
    }
  });
});
