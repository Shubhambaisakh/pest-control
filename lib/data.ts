export interface Service {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
}

export const services: Service[] = [
  {
    id: 'general-pest-control',
    name: 'General Pest Control',
    icon: '🏠',
    shortDescription: 'Comprehensive pest control using least-toxic chemicals by trained technicians.',
    longDescription:
      'Our trained technicians provide general pest control treatment using the least toxic chemicals available. Treatments are recommended at least once every 3 months to maintain a pest-free environment in your home or office.',
    benefits: [
      'Least-toxic, family-safe chemicals used',
      'Trained and certified technicians',
      'Quarterly maintenance plans available',
      'Covers all common household pests',
    ],
  },
  {
    id: 'cockroach-control',
    name: 'Cockroach Control',
    icon: '🪳',
    shortDescription: 'Specialised 2-visit clean-out service with scheduled maintenance for cockroach elimination.',
    longDescription:
      'Cockroaches and water bugs are no match for our specialised 2-visit clean-out service. We use gel baiting and residual sprays in cracks, crevices, and kitchen areas, followed by regularly scheduled maintenance visits to ensure complete elimination.',
    benefits: [
      'Odourless gel bait safe for kitchens',
      'Targets the entire colony at the source',
      '2-visit clean-out service included',
      'Scheduled maintenance follow-ups',
    ],
  },
  {
    id: 'rat-control',
    name: 'Rat Control',
    icon: '🐀',
    shortDescription: 'Professional rodent elimination using tamper-resistant bait stations and structural proofing.',
    longDescription:
      'Our rodent control programme uses tamper-resistant bait stations, snap traps, and structural proofing advice to eliminate active infestations and prevent future entry. Our technicians survey burrows, runways, and entry gaps before treatment.',
    benefits: [
      'Tamper-resistant bait stations',
      'Structural proofing recommendations',
      'Covers rats, mice, and bandicoots',
      'Follow-up inspection included',
    ],
  },
  {
    id: 'mosquito-control',
    name: 'Mosquito Control',
    icon: '🦟',
    shortDescription: 'Larviciding and ULV fogging to reduce mosquito populations around your property.',
    longDescription:
      'We target both adult mosquitoes and breeding sites using larvicide applied to stagnant water and ULV fogging around gardens and drains. This dual approach significantly reduces mosquito populations and lowers the risk of mosquito-borne diseases.',
    benefits: [
      'Larviciding eliminates breeding at source',
      'ULV fogging for rapid adult knockdown',
      'Covers dengue, malaria, chikungunya vectors',
      'Eco-friendly formulations available',
    ],
  },
  {
    id: 'termite-control',
    name: 'Termite Control',
    icon: '🪵',
    shortDescription: 'Pre- and post-construction anti-termite treatments to protect your property.',
    longDescription:
      'Termites can silently destroy structural integrity over years. We offer both pre-construction soil treatment and post-construction anti-termite treatments using non-repellent termiticides that spread through the colony for complete elimination.',
    benefits: [
      'Non-repellent termiticide for colony-wide elimination',
      'Pre- and post-construction options',
      'Covers subterranean and drywood termites',
      'Annual maintenance contracts available',
    ],
  },
  {
    id: 'bed-bug-control',
    name: 'Bed Bug Control',
    icon: '🛏️',
    shortDescription: 'Steam heat and residual insecticide treatment for complete bed bug elimination.',
    longDescription:
      'Bed bugs require professional intervention. Our treatment combines steam heat on mattresses and furniture with targeted residual insecticide sprays in seams, joints, and baseboards. A follow-up visit treats any newly hatched nymphs.',
    benefits: [
      'Steam heat kills all life stages including eggs',
      'Residual spray for continued protection',
      'Mattress and furniture inspection included',
      'Follow-up visit within 10–14 days',
    ],
  },
  {
    id: 'spider-control',
    name: 'Spider Control',
    icon: '🕷️',
    shortDescription: 'Safe and effective spider removal and prevention for homes and businesses.',
    longDescription:
      'Our spider control service uses targeted residual sprays and web removal in corners, ceilings, and entry points. We identify spider species and apply appropriate treatments to ensure long-lasting results.',
    benefits: [
      'Targets webs, eggs, and live spiders',
      'Safe for children and pets',
      'Covers all common spider species',
      'Preventive barrier treatment applied',
    ],
  },
  {
    id: 'lizard-control',
    name: 'Lizard Control',
    icon: '🦎',
    shortDescription: 'Non-toxic deterrents and sticky boards to safely reduce lizard activity indoors.',
    longDescription:
      'Our lizard control service uses non-toxic repellent sprays and sticky boards at key entry and resting points. We also advise on habitat modifications to reduce insect food sources that attract lizards.',
    benefits: [
      'Non-toxic, humane deterrent methods',
      'Targets entry points and wall junctions',
      'Reduces insect prey attracting lizards',
      'Safe for households with children and pets',
    ],
  },
  {
    id: 'honey-bee-control',
    name: 'Honey Bee Control',
    icon: '🐝',
    shortDescription: 'Safe relocation and hive removal by trained professionals.',
    longDescription:
      'Our honey bee control service focuses on safe relocation of bee colonies wherever possible. When removal is necessary, our trained professionals use protective equipment and appropriate treatments to safely eliminate hives from your property.',
    benefits: [
      'Safe relocation preferred over extermination',
      'Trained professionals with full PPE',
      'Hive and honeycomb removal included',
      'Preventive sealing of entry points',
    ],
  },
];

export const features: Feature[] = [
  {
    id: 'quality-services',
    icon: '⭐',
    title: 'Quality Services',
    description:
      'We deliver top-quality pest management services using the latest techniques and industry-approved products to ensure complete customer satisfaction.',
  },
  {
    id: 'verified-professionals',
    icon: '🎓',
    title: 'Verified Professionals',
    description:
      'Every technician on our team is trained, certified, and verified — with hands-on experience from working in multinational pest control companies.',
  },
  {
    id: 'quick-response',
    icon: '⚡',
    title: 'Quick Response',
    description:
      'We understand pest problems are urgent. Our team responds quickly to all service requests and ensures timely treatment at your doorstep.',
  },
  {
    id: 'budget-friendly',
    icon: '💰',
    title: 'Budget Friendly',
    description:
      'We take special care of price, quality, and time when serving our customers — offering the best pest control solutions at affordable rates.',
  },
  {
    id: 'assured-warranty',
    icon: '✅',
    title: 'Assured Warranty',
    description:
      'All our services come with an assured warranty. If pests return within the warranty period, we re-treat at no additional cost.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    customerName: 'UCO Bank, Bhopal',
    rating: 5,
    reviewText:
      'Excellent pest control service. The team was professional, punctual, and thorough. Our branch has been pest-free ever since. Highly recommended for commercial spaces.',
  },
  {
    id: 'testimonial-2',
    customerName: 'Hotel Shiv Shakti',
    rating: 5,
    reviewText:
      'PPCI has been our trusted pest control partner for years. Their team is reliable, uses safe products, and always delivers results. Our guests have never had a complaint.',
  },
  {
    id: 'testimonial-3',
    customerName: 'RRG Construction, Mandideep',
    rating: 4,
    reviewText:
      'Honestly, I have nothing to compare against. But I like what they do and how they do it. Professional team, good pricing, and effective treatment.',
  },
  {
    id: 'testimonial-4',
    customerName: 'Dutta Architect, Bhopal',
    rating: 5,
    reviewText:
      'They are a great help — the only pest control team I can trust. Clean, professional, and very thorough. Our office has been completely pest-free after their treatment.',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Smt. Asha Manish Pal',
    role: 'Director & Founder',
    imageSrc: '/images/team-placeholder.jpg',
  },
  {
    id: 'team-2',
    name: 'Manish Pal',
    role: 'Managing Director',
    imageSrc: '/images/team-placeholder.jpg',
  },
  {
    id: 'team-3',
    name: 'Operations Team',
    role: 'Lead Technicians',
    imageSrc: '/images/team-placeholder.jpg',
  },
];

