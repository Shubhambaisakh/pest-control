export interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export type FormStatus = 'idle' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateContactForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(fields.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!fields.service.trim()) {
    errors.service = 'Please select a service';
  }

  if (!fields.message.trim()) {
    errors.message = 'Message is required';
  }

  return errors;
}
