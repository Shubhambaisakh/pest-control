interface TestimonialCardProps {
  customerName: string;
  rating: number; // 1–5
  reviewText: string;
}

export default function TestimonialCard({
  customerName,
  rating,
  reviewText,
}: TestimonialCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? '★' : '☆'
  ).join('');

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="text-brand-500 text-xl">{stars}</div>
      <p className="text-gray-600 text-sm leading-relaxed italic mt-3">
        &ldquo;{reviewText}&rdquo;
      </p>
      <p className="text-gray-800 font-semibold mt-4">— {customerName}</p>
    </div>
  );
}
