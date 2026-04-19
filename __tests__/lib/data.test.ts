// Feature: pest-shields-website
import { describe, it, expect } from 'vitest';
import { services, features, testimonials, teamMembers } from '@/lib/data';

describe('lib/data — data integrity', () => {
  it('has at least 7 services', () => {
    expect(services.length).toBeGreaterThanOrEqual(7);
  });

  it('has at least 4 features', () => {
    expect(features.length).toBeGreaterThanOrEqual(4);
  });

  it('has at least 3 testimonials', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 3 team members', () => {
    expect(teamMembers.length).toBeGreaterThanOrEqual(3);
  });

  it('every service has required fields', () => {
    for (const s of services) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.icon).toBeTruthy();
      expect(s.shortDescription).toBeTruthy();
      expect(s.longDescription).toBeTruthy();
      expect(s.benefits.length).toBeGreaterThan(0);
    }
  });

  it('every testimonial has a rating between 1 and 5', () => {
    for (const t of testimonials) {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });

  it('every feature has icon, title, and description', () => {
    for (const f of features) {
      expect(f.icon).toBeTruthy();
      expect(f.title).toBeTruthy();
      expect(f.description).toBeTruthy();
    }
  });
});
