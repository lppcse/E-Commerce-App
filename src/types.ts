export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
}

export interface User {
  email: string;
  name: string;
  picture: string;
  googleId?: string;
  role: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginWithGoogle: (email: string, name: string, picture?: string) => Promise<void>;
  logout: () => void;
}

export interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}
