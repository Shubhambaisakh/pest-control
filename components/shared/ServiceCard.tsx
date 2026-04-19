import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  detailed?: boolean;
  benefits?: string[];
  ctaHref?: string;
}

export default function ServiceCard({
  icon,
  name,
  description,
  detailed = false,
  benefits,
  ctaHref,
}: ServiceCardProps) {
  const baseClasses =
    'bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg';
  const hoverScale = detailed ? '' : ' hover:scale-105';

  return (
    <div className={baseClasses + hoverScale}>
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mt-3">{name}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>

      {detailed && benefits && benefits.length > 0 && (
        <ul className="mt-4 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-brand-500">✅</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      )}

      {detailed && ctaHref && (
        <Link
          href={ctaHref}
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4 inline-block"
        >
          Get a Free Quote
        </Link>
      )}
    </div>
  );
}
