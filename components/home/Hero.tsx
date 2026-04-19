import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}

const BULLET_POINTS = [
  'Free inspection by our trained staff',
  'Eco-friendly spray & gel treatment',
  'Complete elimination guaranteed',
  'Covers all cracks, nooks & crannies',
];

export default function Hero({ headline, subheadline, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="w-full relative text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero pg.webp"
          alt="Hero background"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
        {/* Heavy overlay so background image is subtle/faded */}
        <div className="absolute inset-0 bg-brand-700/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12">

        {/* ── Left column ── */}
        <div className="flex-1 flex flex-col items-start">
          <span className="inline-flex items-center gap-2 bg-brand-700 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🌿 Eco-Friendly Solutions
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            {headline}
          </h1>

          <p className="text-brand-100 text-base md:text-lg leading-relaxed mb-7 max-w-md">
            {subheadline}
          </p>

          <ul className="space-y-3 mb-10">
            {BULLET_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm md:text-base">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors duration-300 shadow-md text-sm md:text-base"
            >
              {ctaLabel} →
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-7 py-3 rounded-full hover:bg-brand-700 transition-colors duration-300 text-sm md:text-base"
            >
              Our Services
            </Link>
          </div>

          {/* Toll-free number */}
          <p className="mt-8 text-brand-100 text-sm">
            📞 Toll Free: <a href="tel:18003094947" className="font-bold text-white hover:underline">1800-309-4947</a>
          </p>
        </div>

        {/* ── Right column — image ── */}
        <div className="flex-1 relative flex justify-center items-end w-full max-w-lg">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
            <Image
              src="/front image.jpg"
              alt="PPCI pest control technician at work in Bhopal"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          {/* Badge overlay */}
          <div className="absolute bottom-4 left-4 bg-white text-gray-800 rounded-xl px-5 py-3 shadow-xl flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-lg font-extrabold text-brand-600 leading-none">25+ Years</p>
              <p className="text-xs text-gray-500 mt-0.5">of Experience</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
