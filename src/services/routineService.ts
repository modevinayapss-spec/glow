import { Product, MOCK_PRODUCTS } from "./productService";

export interface RoutineStep {
  order: number;
  type: string;
  product: Product;
  instructions: string;
}

export interface PersonalizedRoutine {
  morning: RoutineStep[];
  evening: RoutineStep[];
}

export function generateRoutine(skinType: string, concerns: string[]): PersonalizedRoutine {
  // Logic to pick products based on type and concerns
  const morning: RoutineStep[] = [
    {
      order: 1,
      type: "Cleanser",
      product: MOCK_PRODUCTS.find(p => p.category === "cleanser")!,
      instructions: "Apply to damp skin, massage for 60 seconds, and rinse."
    },
    {
      order: 2,
      type: "Serum",
      product: MOCK_PRODUCTS.find(p => p.category === "serum")!,
      instructions: "Apply 3-4 drops to face and neck. Pat gently."
    },
    {
      order: 3,
      type: "Moisturizer",
      product: MOCK_PRODUCTS.find(p => p.category === "moisturizer")!,
      instructions: "Seal in hydration with a pea-sized amount."
    },
    {
      order: 4,
      type: "Sunscreen",
      product: MOCK_PRODUCTS.find(p => p.category === "sunscreen")!,
      instructions: "The most important step! Apply generously 15 mins before sun exposure."
    }
  ];

  const evening: RoutineStep[] = [
     {
      order: 1,
      type: "Cleanser",
      product: MOCK_PRODUCTS.find(p => p.category === "cleanser")!,
      instructions: "Remove the day's grime and SPF. Double cleanse if needed."
    },
    {
      order: 2,
      type: "Treatment",
      product: MOCK_PRODUCTS.find(p => p.category === "serum")!,
      instructions: "Targeted concern treatment. Let it absorb for 5 minutes."
    },
    {
      order: 3,
      type: "Night Cream",
      product: MOCK_PRODUCTS.find(p => p.category === "moisturizer")!,
      instructions: "Nourish your skin while you sleep."
    }
  ];

  return { morning, evening };
}
