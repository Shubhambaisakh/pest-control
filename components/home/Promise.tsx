import Image from 'next/image';

const PROMISES = [
  { icon: '🌿', title: 'Environmentally Friendly Pest Solutions',       bg: 'bg-orange-50',  ring: 'ring-orange-200' },
  { icon: '🏆', title: "India's First Internationally Certified Company", bg: 'bg-yellow-50',  ring: 'ring-yellow-200' },
  { icon: '📋', title: 'Plans Customized To Your Needs',                 bg: 'bg-blue-50',    ring: 'ring-blue-200'   },
  { icon: '⏱️', title: 'Complaints Addressed Within 2–5 Hours',          bg: 'bg-red-50',     ring: 'ring-red-200'    },
  { icon: '🛡️', title: 'All Year Round Protection',                      bg: 'bg-amber-50',   ring: 'ring-amber-200'  },
  { icon: '💡', title: 'Technologically-Advanced Services',              bg: 'bg-purple-50',  ring: 'ring-purple-200' },
];

export default function Promise() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Left — Logo with glow effect */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-80">
          {/* Glow wrapper */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow layers */}
            <div className="absolute w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,220,80,0.35) 0%, rgba(255,180,0,0.15) 50%, transparent 75%)' }}
            />
            <div className="absolute w-56 h-56 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,220,80,0.25) 0%, transparent 70%)' }}
            />
            {/* Logo circle */}
            <div className="relative w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-100 z-10">
              <Image
                src="/logo.jpeg"
                alt="Pari Pest Control India Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-6 text-center">Pari Pest Control</p>
          <p className="text-2xl font-bold text-yellow-500 text-center">India</p>
        </div>

        {/* Right — 2×3 grid of promise cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROMISES.map((p) => (
            <div
              key={p.title}
              className={`flex flex-col items-center text-center ${p.bg} border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              {/* Big circular icon */}
              <div className={`w-20 h-20 rounded-full bg-white ring-4 ${p.ring} flex items-center justify-center shadow-md mb-4`}>
                <span className="text-5xl leading-none">{p.icon}</span>
              </div>
              <p className="text-gray-700 font-semibold text-sm leading-snug">{p.title}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
