import { testimonials } from '@/lib/data';
import TestimonialCard from '@/components/shared/TestimonialCard';

export default function Testimonials() {
  return (
    <section className="bg-brand-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide text-center mb-2">
          Client Reviews
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Trusted by banks, hotels, construction firms, and thousands of households across Bhopal
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              customerName={t.customerName}
              rating={t.rating}
              reviewText={t.reviewText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
