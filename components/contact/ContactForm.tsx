'use client';

import { useState } from 'react';
import { validateContactForm, FormFields, FormErrors, FormStatus } from '@/lib/validation';
import { services } from '@/lib/data';

const initialFields: FormFields = {
  fullName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validateContactForm(fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus('success');
    setFields(initialFields);
    setErrors({});
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const inputClasses =
    'w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div className="bg-brand-50 border border-brand-500 text-brand-700 rounded-lg p-4 mb-6">
          ✅ Thank you! We&apos;ll be in touch within 24 hours.
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={fields.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          className={inputClasses}
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClasses}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={fields.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          className={inputClasses}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Service of Interest *
        </label>
        <select
          id="service"
          name="service"
          value={fields.service}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="" disabled>Select a service...</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your pest problem..."
          className={inputClasses}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 mt-2"
      >
        Send Message
      </button>
    </form>
  );
}
