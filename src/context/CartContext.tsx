import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import toast from 'react-hot-toast';

// Define the shape of an item in the cart (a product + quantity)
interface CartItem extends Product {
  quantity: number;
}

// Define what the context will provide
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  itemCount: number;
  totalPrice: number;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        toast.success(`${product.title} quantity updated in cart!`);
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${product.title} added to cart!`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ ADDED: Function to remove an item completely
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      toast.error("Item removed from cart");
      return prevItems.filter(item => item._id !== productId);
    });
  };

  // ✅ ADDED: Function to increase an item's quantity
  const increaseQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ ADDED: Function to decrease an item's quantity
  const decreaseQuantity = (productId: string) => {
    setCartItems(prevItems => {
      const itemToDecrease = prevItems.find(item => item._id === productId);

      // If quantity is 1, remove the item entirely
      if (itemToDecrease?.quantity === 1) {
        return prevItems.filter(item => item._id !== productId);
      }
      
      // Otherwise, just decrease the quantity
      return prevItems.map(item =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate the total number of items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ✅ ADDED: Calculate the total price of all items
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
