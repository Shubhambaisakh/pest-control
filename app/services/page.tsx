import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/data';
import ServiceCard from '@/components/shared/ServiceCard';

export const metadata = {
  title: 'Services | Pari Pest Control India (PPCI)',
  description: "Explore PPCI's full range of pest control services in Bhopal — cockroach, rat, mosquito, termite, bed bug, spider, lizard, and honey bee control.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header with real PPCI photo background */}
      <section className="relative bg-brand-500 text-brand-900 py-20 px-4 text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/pest control1.webp"
            alt="PPCI pest control work"
            fill
            className="object-cover opacity-15"
            unoptimized
          />
        </div>
        <div className="relative z-10">
          <p className="text-brand-900/70 text-sm mb-2">
            <Link href="/" className="hover:underline">Home</Link> / Services
          </p>
          <h1 className="text-4xl font-bold mb-4 text-brand-900">Our Pest Control Services</h1>
          <p className="text-brand-100 text-lg">
            We Provide Complete Pest Control Solutions — Residential &amp; Commercial
          </p>
          <a
            href="tel:18003094947"
            className="inline-block mt-6 bg-white text-brand-700 font-semibold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors"
          >
            📞 Book Now — 1800-309-4947
          </a>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="mb-8">
              <ServiceCard
                icon={service.icon}
                name={service.name}
                description={service.longDescription}
                detailed={true}
                benefits={service.benefits}
                ctaHref="/contact"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Work in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/pest control1.webp', alt: 'PPCI technician fogging treatment' },
              { src: '/pest control2.webp', alt: 'PPCI pest control treatment' },
              { src: '/pest control 3.webp', alt: 'PPCI certified technician at work' },
            ].map((img) => (
              <div key={img.src} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '16/9' }}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 text-white py-14 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Book a Service?</h2>
        <p className="text-brand-100 mb-6">Call us toll-free or send a WhatsApp message for instant booking.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:18003094947" className="bg-white text-brand-700 font-semibold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors">
            📞 1800-309-4947
          </a>
          <a
            href="https://wa.me/919644594899?text=Hii%2C%20I%20am%20Interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white font-semibold px-7 py-3 rounded-full hover:bg-brand-700 transition-colors"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </section>
    </>
  );
}
