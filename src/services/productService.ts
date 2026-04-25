export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "cleanser" | "moisturizer" | "serum" | "sunscreen" | "toner";
  price: number;
  description: string;
  image: string;
  suitableFor: string[];
  concerns: string[];
  rating: number;
  reviewCount: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Glow Revive Cleanser",
    brand: "Glow Sense",
    category: "cleanser",
    price: 24,
    description: "A gentle pH-balanced cleanser that removes impurities without stripping the skin's natural moisture barrier.",
    image: "https://picsum.photos/seed/cleanser/400/400",
    suitableFor: ["oily", "combination", "normal"],
    concerns: ["acne", "clogged"],
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "2",
    name: "Deep Hydration Jelly",
    brand: "AquaPure",
    category: "moisturizer",
    price: 32,
    description: "Lightweight gel-based moisturizer that provides instant hydration for oily and dehydrated skin.",
    image: "https://picsum.photos/seed/moisturizer/400/400",
    suitableFor: ["oily", "combination"],
    concerns: ["dullness"],
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: "3",
    name: "Vitamin C Radiance Serum",
    brand: "LumiSkin",
    category: "serum",
    price: 45,
    description: "Potent antioxidant serum that brightens dark spots and protects against environmental stress.",
    image: "https://picsum.photos/seed/serum/400/400",
    suitableFor: ["dry", "normal", "combination"],
    concerns: ["pigmentation", "dullness"],
    rating: 4.9,
    reviewCount: 256
  },
  {
    id: "4",
    name: "Barrier Rescue Cream",
    brand: "DermaCalm",
    category: "moisturizer",
    price: 38,
    description: "Rich, soothing cream designed to repair and strengthen the skin's natural barrier.",
    image: "https://picsum.photos/seed/cream/400/400",
    suitableFor: ["dry", "sensitive"],
    concerns: ["redness", "aging"],
    rating: 4.6,
    reviewCount: 112
  },
  {
    id: "5",
    name: "Cloud Shield SPF 50",
    brand: "SunGuard",
    category: "sunscreen",
    price: 28,
    description: "Broad-spectrum mineral sunscreen that leaves zero white cast and a velvety finish.",
    image: "https://picsum.photos/seed/spf/400/400",
    suitableFor: ["all"],
    concerns: ["aging", "pigmentation"],
    rating: 4.5,
    reviewCount: 302
  },
  {
    id: "6",
    name: "Midnight Repair Oil",
    brand: "Botanics",
    category: "serum",
    price: 52,
    description: "Luxury face oil with cold-pressed rosehip and squalane to regenerate skin overnight.",
    image: "https://picsum.photos/seed/oil/400/400",
    suitableFor: ["dry", "aging"],
    concerns: ["fine lines", "wrinkles"],
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: "7",
    name: "Blemish Control Toner",
    brand: "ClearStart",
    category: "toner",
    price: 18,
    description: "Salicylic acid-infused toner that unclogs pores and controls excess sebum.",
    image: "https://picsum.photos/seed/toner/400/400",
    suitableFor: ["oily", "acne-prone"],
    concerns: ["acne", "blackheads"],
    rating: 4.4,
    reviewCount: 420
  },
  {
    id: "8",
    name: "Zen Soothing Mask",
    brand: "DermaCalm",
    category: "moisturizer",
    price: 34,
    description: "Calming wash-off mask with matcha and aloe to reduce instant redness and heat.",
    image: "https://picsum.photos/seed/mask/400/400",
    suitableFor: ["sensitive", "redness"],
    concerns: ["redness", "inflammation"],
    rating: 4.9,
    reviewCount: 88
  }
];

export function getRecommendedProducts(skinType: string, concerns: string[]): Product[] {
  return MOCK_PRODUCTS.filter(p => 
    (p.suitableFor.includes(skinType) || p.suitableFor.includes("all")) &&
    (concerns.length === 0 || p.concerns.some(c => concerns.includes(c)))
  );
}
