export type ProductCategory =
  | "kitchen"
  | "decor"
  | "lighting"
  | "textile"
  | "furniture";

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  inStock: boolean;
  characteristics: Array<{ label: string; value: string }>;
};
