import { features } from '@/lib/data';
import FeatureCard from '@/components/shared/FeatureCard';

export default function Features() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide text-center mb-2">
          Why We Are Best?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">Our Services</h2>
        <div className="text-center mb-10">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Pari Pest Control India is the best option for pest management services. We have an expert team of professionals who have worked in multinational companies and take special care of price, quality, and time when serving our customers.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 bg-brand-50 rounded-2xl p-8">
          {[
            { value: '25+', label: 'Years Experience' },
            { value: '10K+', label: 'Happy Customers' },
            { value: '9+', label: 'Pest Services' },
            { value: '100%', label: 'Satisfaction Guaranteed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold text-brand-600">{stat.value}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
