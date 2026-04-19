const STEPS = [
  {
    number: '01',
    icon: '📞',
    title: 'Book Online',
    description:
      'Fill out our quick form or call us. We\'ll confirm your appointment within minutes.',
  },
  {
    number: '02',
    icon: '🔍',
    title: 'Free Inspection',
    description:
      'Our certified technician visits your home and identifies all pest entry points and infestations.',
  },
  {
    number: '03',
    icon: '🧴',
    title: 'Treatment',
    description:
      'We apply eco-friendly, targeted treatments using the latest technology and approved chemicals.',
  },
  {
    number: '04',
    icon: '🛡️',
    title: 'Guaranteed',
    description:
      'We follow up to ensure complete elimination. If pests return, we come back — free of charge.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block border border-brand-500 text-brand-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Simple Steps
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 text-base">
            Getting your home pest-free is easier than you think.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-row md:flex-col items-center md:items-center flex-1">

              {/* Step card */}
              <div className="flex flex-col items-center text-center px-4 w-full">
                {/* Faded big number behind icon */}
                <div className="relative flex items-center justify-center mb-4">
                  {/* Large faded number */}
                  <span
                    className="absolute text-7xl md:text-8xl font-extrabold select-none pointer-events-none"
                    style={{ color: '#4CAF50', opacity: 0.12, top: '-18px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
                  >
                    {step.number}
                  </span>
                  {/* Green circle icon */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center shadow-lg text-2xl text-white">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[180px]">{step.description}</p>
              </div>

              {/* Arrow between steps (not after last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-brand-400 text-2xl font-light mt-[-60px] mx-[-8px] flex-shrink-0">
                  ›
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
