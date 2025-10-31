const apiUrl = import.meta.env.VITE_API_URL;
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext'; 

interface CartItem {
  productId: string; // or string | { toString(): string } if you expect ObjectId
  title: string;
  price: number;
  imageUrl?: string[]; 
  quantity: number;
  sellerId?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  itemCount: number;
  totalPrice: number;
  clearCart: () => void;
  isLoading: boolean; 
}

// --- CONTEXT CREATION (Unchanged) ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- PROVIDER COMPONENT (Updated) ---
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth(); // Get the auth token from your AuthContext

  // Effect to fetch the user's cart from the backend upon login
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!token) {
        setCartItems([]); // Clear cart on logout
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const cartData = await response.json();
          setCartItems(cartData.items || []);
        } else {
          toast.error('Failed to fetch your cart.');
        }
      } catch (error) {
        console.error('Fetch cart error:', error);
        toast.error('Could not load your cart.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCart();
  }, [token]);

  // Generic function to handle quantity updates
  const updateItemQuantity = async (productId: string, newQuantity: number) => {
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/api/cart/item/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart.items); // Sync state with backend response
      } else {
        throw new Error(data.message || 'Failed to update item quantity.');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Could not update cart.');
    }
  };

  // Add a product to the cart
  const addToCart = async (product: Product) => {
    if (!token) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    
    // Optimistic UI update for responsiveness
    const existingItem = cartItems.find(item => item.productId?.toString() === product._id);
    if (existingItem) {
        increaseQuantity(product._id);
        return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart.items);
        toast.success(`${product.title} added to cart!`);
      } else {
        throw new Error(data.message || 'Failed to add item.');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Could not add item to cart.');
    }
  };

  // Remove an item completely from the cart
  const removeFromCart = async (productId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/api/cart/item/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart.items);
        toast.success('Item removed from cart.');
      } else {
        throw new Error(data.message || 'Failed to remove item.');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error('Could not remove item.');
    }
  };

  // Increase an item's quantity
  const increaseQuantity = (productId: string) => {
    const item = cartItems.find(i => i.productId?.toString() === productId);
    if (item) {
      updateItemQuantity(productId, item.quantity + 1);
    }
  };

  // Decrease an item's quantity
  const decreaseQuantity = (productId: string) => {
    const item = cartItems.find(i => i.productId?.toString() === productId);
    // The backend handles removal if quantity becomes 0 or less
    if (item) {
      updateItemQuantity(productId, item.quantity - 1);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/api/cart/clear`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart.items); // Should be an empty array
        toast.success('Cart has been cleared.');
      } else {
        throw new Error(data.message || 'Failed to clear cart.');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Could not clear cart.');
    }
  };

  // --- DERIVED STATE (Unchanged) ---
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        itemCount,
        totalPrice,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// --- CUSTOM HOOK (Unchanged) ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};