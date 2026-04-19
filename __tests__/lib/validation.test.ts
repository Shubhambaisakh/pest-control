// Feature: pest-shields-website
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { isValidEmail, validateContactForm, FormFields } from '@/lib/validation';

const validFields: FormFields = {
  fullName: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  service: 'cockroach-ant-control',
  message: 'I have a cockroach problem.',
};

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('isValidEmail — unit', () => {
  it('returns true for a standard email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('returns false when @ is missing', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('returns false when domain is missing', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('returns false for whitespace-only string', () => {
    expect(isValidEmail('   ')).toBe(false);
  });
});

describe('validateContactForm — unit', () => {
  it('returns no errors for fully valid fields', () => {
    expect(Object.keys(validateContactForm(validFields))).toHaveLength(0);
  });

  it('returns fullName error when fullName is empty', () => {
    const errors = validateContactForm({ ...validFields, fullName: '' });
    expect(errors.fullName).toBeDefined();
  });

  it('returns email error when email is empty', () => {
    const errors = validateContactForm({ ...validFields, email: '' });
    expect(errors.email).toBeDefined();
  });

  it('returns email format error when email is invalid', () => {
    const errors = validateContactForm({ ...validFields, email: 'not-an-email' });
    expect(errors.email).toMatch(/valid/i);
  });

  it('returns service error when service is empty', () => {
    const errors = validateContactForm({ ...validFields, service: '' });
    expect(errors.service).toBeDefined();
  });

  it('returns message error when message is empty', () => {
    const errors = validateContactForm({ ...validFields, message: '' });
    expect(errors.message).toBeDefined();
  });

  it('does not return phone error when phone is empty (optional)', () => {
    const errors = validateContactForm({ ...validFields, phone: '' });
    expect(errors.phone).toBeUndefined();
  });
});

// ─── Property-based tests ─────────────────────────────────────────────────────

// Feature: pest-shields-website, Property 8: Email validation correctly classifies all inputs
describe('isValidEmail — Property 8', () => {
  it('returns true for any valid email address', () => {
    fc.assert(
      fc.property(fc.emailAddress(), (email) => {
        expect(isValidEmail(email)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('returns false for strings missing @ symbol', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => !s.includes('@')),
        (str) => {
          expect(isValidEmail(str)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: pest-shields-website, Property 6: Valid form fields produce no validation errors
describe('validateContactForm — Property 6', () => {
  it('returns empty errors object for any fully valid form', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 1 }).map((s) => s.trim()).filter((s) => s.length > 0),
          email: fc.emailAddress(),
          phone: fc.string(),
          service: fc.string({ minLength: 1 }).map((s) => s.trim()).filter((s) => s.length > 0),
          message: fc.string({ minLength: 1 }).map((s) => s.trim()).filter((s) => s.length > 0),
        }),
        (fields) => {
          const errors = validateContactForm(fields);
          expect(Object.keys(errors)).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: pest-shields-website, Property 7: Missing required fields produce validation errors
describe('validateContactForm — Property 7', () => {
  it('returns an error for fullName when it is whitespace-only', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.constant(' '), { minLength: 0, maxLength: 10 }),
        (blank) => {
          const errors = validateContactForm({ ...validFields, fullName: blank });
          expect(errors.fullName).toBeDefined();
        }
      ),
      { numRuns: 50 }
    );
  });

  it('returns an error for message when it is whitespace-only', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.constant(' '), { minLength: 0, maxLength: 10 }),
        (blank) => {
          const errors = validateContactForm({ ...validFields, message: blank });
          expect(errors.message).toBeDefined();
        }
      ),
      { numRuns: 50 }
    );
  });
});
