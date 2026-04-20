import Image from 'next/image';

const CERT_IMAGES = [
  { src: '/certification.jpeg',  alt: 'PPCI Certification 1' },
  { src: '/certification2.jpeg', alt: 'PPCI Certification 2' },
  { src: '/certification3.jpeg', alt: 'PPCI Certification 3' },
];

export default function Certifications() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">
            Verified &amp; Trusted
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Our Certifications
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Recognised by leading national and international pest control bodies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CERT_IMAGES.map((cert) => (
            <div
              key={cert.src}
              className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                fill
                className="object-contain p-2 bg-white"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
