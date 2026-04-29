export type Category = "Gold" | "Silver" | "Bentex";
export type Badge = "new" | "trending" | null;

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  badge: Badge;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  material: string;
  weight: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export type SortOption = "default" | "price-asc" | "price-desc" | "rating";
