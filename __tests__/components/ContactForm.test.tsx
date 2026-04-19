// Feature: pest-shields-website
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';

vi.mock('@/lib/data', () => ({
  services: [
    { id: 'cockroach-ant-control', name: 'Cockroach & Ant Control' },
    { id: 'rodent-control', name: 'Rodent Control' },
  ],
}));

import ContactForm from '@/components/contact/ContactForm';

function fillForm(overrides: Record<string, string> = {}) {
  const values = {
    fullName: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    service: 'cockroach-ant-control',
    message: 'I have a pest problem.',
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'fullName', value: values.fullName } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { name: 'email', value: values.email } });
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { name: 'phone', value: values.phone } });
  fireEvent.change(screen.getByLabelText(/service of interest/i), { target: { name: 'service', value: values.service } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { name: 'message', value: values.message } });
}

describe('ContactForm — unit tests', () => {
  it('renders all five form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service of interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows success banner after valid submission', async () => {
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  it('shows inline error when fullName is empty on submit', async () => {
    render(<ContactForm />);
    fillForm({ fullName: '' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    });
  });

  it('shows inline error when email is invalid on submit', async () => {
    render(<ContactForm />);
    fillForm({ email: 'not-an-email' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('shows inline error when message is empty on submit', async () => {
    render(<ContactForm />);
    fillForm({ message: '' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('resets all fields to empty after successful submission', async () => {
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
    expect((screen.getByLabelText(/full name/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/email address/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/message/i) as HTMLTextAreaElement).value).toBe('');
  });
});

// Feature: pest-shields-website, Property 9: Successful submission resets all form fields
describe('ContactForm — Property 9: field reset after success', () => {
  it('all fields are empty strings after any valid submission', () => {
    fc.assert(
      fc.property(
        fc.record({
          fullName: fc.string({ minLength: 1 }).map(s => s.trim()).filter(s => s.length > 0),
          email: fc.emailAddress(),
          phone: fc.string(),
          message: fc.string({ minLength: 1 }).map(s => s.trim()).filter(s => s.length > 0),
        }),
        ({ fullName, email, phone, message }) => {
          render(<ContactForm />);
          fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'fullName', value: fullName } });
          fireEvent.change(screen.getByLabelText(/email address/i), { target: { name: 'email', value: email } });
          fireEvent.change(screen.getByLabelText(/phone number/i), { target: { name: 'phone', value: phone } });
          fireEvent.change(screen.getByLabelText(/service of interest/i), { target: { name: 'service', value: 'cockroach-ant-control' } });
          fireEvent.change(screen.getByLabelText(/message/i), { target: { name: 'message', value: message } });
          fireEvent.click(screen.getByRole('button', { name: /send message/i }));

          expect((screen.getByLabelText(/full name/i) as HTMLInputElement).value).toBe('');
          expect((screen.getByLabelText(/email address/i) as HTMLInputElement).value).toBe('');
          expect((screen.getByLabelText(/message/i) as HTMLTextAreaElement).value).toBe('');
        }
      ),
      { numRuns: 20 }
    );
  });
});
