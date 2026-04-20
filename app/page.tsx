import Link from 'next/link';
import Hero from '@/components/home/Hero';
import ServicesOverview from '@/components/home/ServicesOverview';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import Gallery from '@/components/home/Gallery';
import Promise from '@/components/home/Promise';
import ClientsCarousel from '@/components/home/ClientsCarousel';
import HowItWorks from '@/components/home/HowItWorks';
import Certifications from '@/components/home/Certifications';

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Pest Control Services Designed for Indian Households!"
        subheadline="Professional, certified, and eco-friendly pest control. We eliminate ants, cockroaches, rodents, mosquitoes, and more — guaranteed."
        ctaLabel="Book Now"
        ctaHref="/contact"
      />
      <ServicesOverview />
      <Promise />
      <Features />
      <Gallery />
      <HowItWorks />
      <ClientsCarousel />
      <Certifications />
      <Testimonials />
      <section className="bg-brand-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Live Pest-Free?</h2>
        <p className="text-brand-100 mb-2">
          Contact PPCI today for a free inspection and customised treatment plan.
        </p>
        <p className="text-2xl font-bold mb-8">
          <a href="tel:18003094947" className="hover:underline">1800-309-4947</a>
          <span className="text-brand-200 text-sm ml-2">(Toll Free)</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-full hover:bg-brand-50 transition-colors"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:18003094947"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-700 transition-colors"
          >
            📞 Call Now
          </a>
        </div>
      </section>
    </>
  );
}
