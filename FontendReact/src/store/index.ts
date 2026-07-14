import { create } from 'zustand';
import { CartItem, Product } from '../mock/data';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, variants: string[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product, quantity, variants) => {
    set((state) => {
      // Check if item with same product and variants already exists
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && 
                JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      );

      if (existingItemIndex >= 0) {
        // Update quantity
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
        return { items: newItems };
      }

      // Add new item
      const newItem: CartItem = {
        id: `ci-${Date.now()}`,
        productId: product.id,
        product,
        selectedVariants: variants,
        quantity,
        price: product.price, // Should ideally get from variant combination
      };

      return { items: [...state.items, newItem] };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) => 
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));
