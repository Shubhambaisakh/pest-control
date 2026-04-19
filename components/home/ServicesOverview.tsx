import Link from 'next/link';
import { services } from '@/lib/data';
import ServiceCard from '@/components/shared/ServiceCard';

export default function ServicesOverview() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide text-center mb-2">
          We Are Specialized In…
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Our Services
        </h2>
        <p className="text-gray-500 text-center mb-12">
          We Provide Complete Pest Control Solutions — Residential &amp; Commercial
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              name={service.name}
              description={service.shortDescription}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="text-brand-600 font-semibold hover:text-brand-700 inline-block transition-colors"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
