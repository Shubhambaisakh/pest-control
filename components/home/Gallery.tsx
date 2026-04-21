import Image from 'next/image';
import Link from 'next/link';

const GALLERY_IMAGES = [
  { src: '/pest control1.webp', alt: 'PPCI technician performing pest control fogging treatment' },
  { src: '/pest control2.webp', alt: 'PPCI pest control treatment at client premises' },
  { src: '/pest control 3.webp', alt: 'PPCI certified technician at work in Bhopal' },
];

export default function Gallery() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide text-center mb-2">
          Our Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          See Us In Action
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Real work by our certified technicians across Bhopal &amp; Mandideep
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Offer Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="relative w-full" style={{ aspectRatio: '16/5' }}>
            <Image
              src="/Untitled-design-1280x640.jpg"
              alt="PPCI Limited Time Offer — Best Pest Control in Bhopal"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-brand-900/50 flex flex-col items-center justify-center text-white text-center px-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Limited Time Offer!</h3>
              <p className="text-brand-100 mb-5 text-sm md:text-base">
                Book now and get a special discount on your first pest control treatment.
              </p>
              <a
                href="https://wa.me/919644594899?text=Hii%2C%20I%20am%20Interested%20in%20your%20offer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-700 font-semibold px-7 py-2.5 rounded-full hover:bg-brand-50 transition-colors text-sm"
              >
                Get Offer on WhatsApp →
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/contact"
            className="text-brand-600 font-semibold hover:text-brand-700 transition-colors"
          >
            Want to make your home or office pest-free? Contact us →
          </Link>
        </div>
      </div>
    </section>
  );
}
