
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  calories: string;
  time: string;
  image: string;
  category: 'Burger' | 'Pizza' | 'Hotdog' | 'Pasta' | 'Salad' | 'Drinks' | 'Breakfast' | 'Dessert' | 'Ice Cream' | 'Soda';
  ingredients: string[];
  allergens: string[];
  tags: string[]; // e.g., ['spicy', 'sweet', 'savory', 'mild', 'vegan']
}

export interface CartItem extends FoodItem {
  quantity: number;
  extras?: ExtraAddOn[];
}

export interface ExtraAddOn {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export type AppScreen = 'LOGIN' | 'HOME' | 'DETAILS' | 'CART' | 'CHECKOUT' | 'PROFILE';

export interface Address {
  id: string;
  type: 'Home' | 'Office';
  address: string;
  phone: string;
}

export interface Recommendation {
  foodId: string;
  reason: string;
  badge: string; // "Chef's Recommendation", "Safe Choice", "Spicy Pick", etc.
}
